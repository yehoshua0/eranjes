"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getBlogs() {
  return await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createBlog(data: { title: string; category: string; author: string; content: string; excerpt?: string }) {
  const blog = await prisma.blog.create({
    data: {
      ...data,
      views: 0,
      status: "Publié",
    },
  });
  revalidatePath("/admin/blogs");
  revalidatePath("/blogs");
  return blog;
}

export async function deleteBlog(id: string) {
  await prisma.blog.delete({ where: { id } });
  revalidatePath("/admin/blogs");
  revalidatePath("/blogs");
}

export async function getSermons() {
  return await prisma.sermon.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createSermon(data: { title: string; preacher: string; duration: string; category: string }) {
  const sermon = await prisma.sermon.create({
    data: {
      ...data,
      listeners: 0,
      status: "Publié",
    },
  });
  revalidatePath("/admin/sermons");
  revalidatePath("/sermons");
  return sermon;
}

export async function deleteSermon(id: string) {
  await prisma.sermon.delete({ where: { id } });
  revalidatePath("/admin/sermons");
  revalidatePath("/sermons");
}

export async function getEvents() {
  return await prisma.event.findMany({
    orderBy: { date: "asc" },
  });
}

export async function createEvent(data: { title: string; date: Date; time: string; location: string; category: string }) {
  const event = await prisma.event.create({
    data: {
      ...data,
      registrations: 0,
      status: "À venir",
    },
  });
  revalidatePath("/admin/evenements");
  revalidatePath("/evenements");
  return event;
}

export async function deleteEvent(id: string) {
  await prisma.event.delete({ where: { id } });
  revalidatePath("/admin/evenements");
  revalidatePath("/evenements");
}
