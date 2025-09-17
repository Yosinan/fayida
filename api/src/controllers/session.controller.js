const prisma = require('../prisma');

// List sessions for current user
async function mySessions(req, res) {
    const sessions = await prisma.session.findMany({
        where: { userId: req.user.id, isValid: true },
        select: {
            id: true,
            deviceId: true,
            deviceInfo: true,
            lastSeenAt: true,
            createdAt: true,
            expiresAt: true,
        },
        orderBy: { createdAt: 'desc' },
    });
    res.json(sessions);
}

// Revoke a session (self)
async function revokeSession(req, res) {
    const sid = Number(req.params.id);
    const session = await prisma.session.findFirst({
        where: { id: sid, userId: req.user.id, isValid: true },
    });
    if (!session) return res.status(404).json({ message: 'Session not found' });

    await prisma.session.update({ where: { id: sid }, data: { isValid: false } });
    res.json({ message: 'Session revoked' });
}

// Admin: revoke session for another user
async function adminRevoke(req, res) {
    const sid = Number(req.params.id);
    const session = await prisma.session.findUnique({ where: { id: sid } });
    if (!session) return res.status(404).json({ message: 'Session not found' });

    await prisma.session.update({ where: { id: sid }, data: { isValid: false } });
    res.json({ message: `Session ${sid} revoked by admin` });
}

module.exports = { mySessions, revokeSession, adminRevoke };
