const jwt = require('jsonwebtoken');
const prisma = require('../prisma');

const JWT_SECRET = process.env.JWT_SECRET;

async function authMiddleware(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });
    const token = auth.split(' ')[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        // ensure session still valid
        const session = await prisma.session.findUnique({ where: { id: payload.sid } });
        if (!session || !session.isValid) return res.status(401).json({ message: 'Invalid session' });
        req.user = { id: payload.sub, role: payload.role, sid: payload.sid };
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

function requireRole(role) {
    return (req, res, next) => {
        if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
        if (req.user.role !== role && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
}

module.exports = { authMiddleware, requireRole };
