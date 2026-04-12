import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({})

async function main() {
  console.log("Start seeding...")

  const blog1 = await prisma.blog.create({
    data: {
      title: "Comment nourrir sa foi quotidiennement",
      excerpt: "La vie moderne peut nous éloigner de l'essentiel. Voici 5 habitudes pour rester connecté à la Parole...",
      content: "<p>La vie moderne peut nous éloigner de l'essentiel...</p>",
      category: "Croissance",
      author: "Pasteur Jean",
      views: 452,
      status: "Publié",
    }
  })

  const blog2 = await prisma.blog.create({
    data: {
      title: "L'impact du service dans la communauté",
      excerpt: "Servir ne transforme pas seulement la vie des autres, mais surtout la nôtre.",
      content: "<p>Servir ne transforme pas seulement la vie des autres...</p>",
      category: "Communauté",
      author: "Responsable Social",
      views: 890,
      status: "Publié",
    }
  })

  const blog3 = await prisma.blog.create({
    data: {
      title: "La jeunesse face aux défis du 21e siècle",
      excerpt: "Être jeune et chrétien aujourd'hui demande du courage et du discernement.",
      content: "<p>Être jeune et chrétien aujourd'hui demande du courage...</p>",
      category: "Jeunesse",
      author: "Leader Jeune",
      views: 1205,
      status: "Publié",
    }
  })

  const countBlogs = await prisma.blog.count()
  console.log(`Created ${countBlogs} blogs`)

  const sermon1 = await prisma.sermon.create({
    data: {
      title: "Vaincre par la Foi",
      preacher: "Pasteur Jean",
      duration: "45:20",
      category: "Enseignement",
      listeners: 156,
      status: "Publié"
    }
  })
  
  const event1 = await prisma.event.create({
    data: {
      title: "Culte de la Résurrection",
      date: new Date("2024-04-20T09:00:00Z"),
      time: "09:00 - 12:30",
      location: "Temple Central",
      category: "Culte",
      registrations: 450,
      status: "À venir"
    }
  })

  console.log("Seeding finished.")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
