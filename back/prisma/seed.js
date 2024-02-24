const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

async function seed() {
  const prisma = new PrismaClient();

  try {
    const saltRounds = 10;

    const userData = [
      { role: 'USER', firstName: 'Ayaka', lastName: 'Kamisato', phoneNumber: '0970687203', gender: 'FEMALE', email: 'Ayaka@ggg.mail', password: '123456' },
      { role: 'USER', firstName: 'Ayato', lastName: 'Kamisato', phoneNumber: '0649129673', gender: 'MALE', email: 'Ayato@ggg.mail', password: '123456' },
      { role: 'USER', firstName: 'Ei',  lastName: 'Shogun', phoneNumber: '0611214879', gender: 'FEMALE', email: 'Shogun@ggg.mail', password: '123456' },
    ];

    // Hash passwords
    const hashedUserData = await Promise.all(userData.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      return { ...user, password: hashedPassword };
    }));

    // Insert users into the database
    await prisma.customer.createMany({
      data: hashedUserData,
    });

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1); // Exit with error code
  } finally {
    // Disconnect Prisma client after seeding
    await prisma.$disconnect();
  }
}

seed();
