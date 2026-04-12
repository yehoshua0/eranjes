import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log("Truncating all tables...")
  await prisma.blog.deleteMany()
  await prisma.sermon.deleteMany()
  await prisma.event.deleteMany()
  console.log("All tables truncated successfully!")
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); })
