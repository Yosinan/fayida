const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    const pw = await bcrypt.hash('Password123!', 10);

    const admin = await prisma.user.upsert({
        where: { email: 'admin@fayida.test' },
        update: {},
        create: {
            email: 'admin@fayida.test',
            password: pw,
            firstName: 'Admin',
            lastName: 'Fayida',
            role: 'admin',
        },
    });

    const student = await prisma.user.upsert({
        where: { email: 'student1@fayida.test' },
        update: {},
        create: {
            email: 'student1@fayida.test',
            password: pw,
            firstName: 'Student',
            lastName: 'One',
            role: 'student',
        },
    });

    const instructor = await prisma.user.upsert({
        where: { email: 'instructor1@fayida.test' },
        update: {},
        create: {
            email: 'instructor1@fayida.test',
            password: pw,
            firstName: 'Instructor',
            lastName: 'One',
            role: 'instructor',
        },
    });

    console.log({ admin, student, instructor });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
