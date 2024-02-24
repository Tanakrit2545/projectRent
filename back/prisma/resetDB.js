const {PrismaClient} =require('@prisma/client')
const prisma = new PrismaClient()

async function run() {
  await prisma.$executeRawUnsafe('DROP Database pizzavanta')
  await prisma.$executeRawUnsafe('CREATE Database pizzavanta')
}
console.log('Reset DB')
run()