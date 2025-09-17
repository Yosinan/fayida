const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma');
const { isSameUTCDate, isYesterday } = require('../utils/date');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const REFRESH_DAYS = parseInt(process.env.REFRESH_TOKEN_EXPIRES_DAYS || '30', 10);

function signAccessToken(user, sessionId) {
    return jwt.sign({ sub: user.id, role: user.role, sid: sessionId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function createRefreshToken() {
    // simple random token
    return require('crypto').randomBytes(48).toString('hex');
}

async function signup(req, res) {
    const { email, password, firstName, lastName, role } = req.body;
    if (!email || !password || !firstName || !lastName || !role) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { email, password: hashed, firstName, lastName, role }
    });
    return res.status(201).json({ id: user.id, email: user.email, role: user.role });
}

async function login(req, res) {
    const { email, password } = req.body;
    const deviceId = req.headers["x-device-id"];
    const deviceInfo = req.headers["x-device-info"];
    if (!email || !password) return res.status(400).json({ message: 'Missing credentials' });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    // enforce max 2 active sessions
    const activeSessions = await prisma.session.count({
        where: { userId: user.id, isValid: true }
    });
    if (activeSessions >= 2) {
        // block login attempt
        return res.status(403).json({ message: 'Maximum of 2 active devices reached. Logout from another device or contact admin.' });
    }

    // create refresh token and session
    const refreshToken = createRefreshToken();
    const expiresAt = new Date(Date.now() + REFRESH_DAYS * 24 * 60 * 60 * 1000);

    const session = await prisma.session.create({
        data: {
            userId: user.id,
            refreshToken,
            deviceId: deviceId || null,
            deviceInfo: deviceInfo || req.get('User-Agent') || null,
            expiresAt
        }
    });

    const accessToken = signAccessToken(user, session.id);

    // update streak now that they logged in
    await updateStreakOnLogin(user);

    return res.json({
        accessToken,
        refreshToken,
        user: { id: user.id, email: user.email, role: user.role, firstName: user.firstName, lastName: user.lastName }
    });
}

async function logout(req, res) {
    // expects session id in the authenticated token (sid) OR refresh token for logout
    const sid = req.user?.sid;
    if (sid) {
        await prisma.session.updateMany({ where: { id: sid }, data: { isValid: false } });
        return res.json({ message: 'Logged out' });
    }
    // fallback: accept refresh token in body
    const { refreshToken } = req.body;
    if (refreshToken) {
        await prisma.session.updateMany({ where: { refreshToken }, data: { isValid: false } });
        return res.json({ message: 'Logged out' });
    }
    res.status(400).json({ message: 'No session found' });
}

async function refresh(req, res) {
    const { refreshToken } = req.body || {};
    if (!refreshToken) return res.status(400).json({ message: 'Missing refresh token' });

    const session = await prisma.session.findUnique({ where: { refreshToken } });
    if (!session || !session.isValid || (session.expiresAt && session.expiresAt < new Date())) {
        return res.status(401).json({ message: 'Invalid refresh token' });
    }
    const user = await prisma.user.findUnique({ where: { id: session.userId } });
    if (!user) return res.status(401).json({ message: 'Invalid session' });

    const accessToken = signAccessToken(user, session.id);
    // update lastSeen
    await prisma.session.update({ where: { id: session.id }, data: { lastSeenAt: new Date() } });
    return res.json({ accessToken });
}

// Helper: update streak on login
async function updateStreakOnLogin(user) {
    const now = new Date();
    const streak = await prisma.streak.findUnique({ where: { userId: user.id } });
    if (!streak) {
        await prisma.streak.create({ data: { userId: user.id, count: 1, lastLoginAt: now } });
        return;
    }
    const last = streak.lastLoginAt;
    if (!last) {
        await prisma.streak.update({ where: { id: streak.id }, data: { count: 1, lastLoginAt: now } });
        return;
    }
    // if last was yesterday (UTC)
    const yesterday = new Date(now);
    yesterday.setUTCDate(now.getUTCDate() - 1);
    const sameAsYesterday = isSameUTCDate(last, yesterday);
    const sameAsToday = isSameUTCDate(last, now);
    if (sameAsToday) {
        // already logged in today — do nothing
        return;
    } else if (sameAsYesterday) {
        await prisma.streak.update({ where: { id: streak.id }, data: { count: streak.count + 1, lastLoginAt: now } });
    } else {
        await prisma.streak.update({ where: { id: streak.id }, data: { count: 0, lastLoginAt: now } });
    }
}

module.exports = { signup, login, logout, refresh };
