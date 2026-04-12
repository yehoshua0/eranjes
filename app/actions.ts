"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getBlogs() {
  return await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createBlog(formData: FormData) {
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const author = formData.get("author") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const coverFile = formData.get("cover") as File;

  let cover = undefined;

  if (coverFile && coverFile.size > 0) {
    const { supabase } = await import('@/lib/supabase');
    const fileExt = coverFile.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `blogs/${fileName}`;

    const { data: uploadData, error } = await supabase.storage
      .from('medias')
      .upload(filePath, coverFile);

    if (error) {
      console.error("Storage upload error:", error);
    } else {
      const { data: publicUrlData } = supabase.storage.from('medias').getPublicUrl(filePath);
      cover = publicUrlData.publicUrl;
    }
  }

  const blog = await prisma.blog.create({
    data: {
      title,
      category,
      author,
      content,
      excerpt,
      ...(cover && { cover }),
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

export async function createSermon(formData: FormData) {
  const title = formData.get("title") as string;
  const preacher = formData.get("preacher") as string;
  const duration = formData.get("duration") as string;
  const category = formData.get("category") as string;
  const audioFile = formData.get("audio") as File;

  let audioUrl = null;

  if (audioFile && audioFile.size > 0) {
    const { supabase } = await import('@/lib/supabase');
    const fileExt = audioFile.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `sermons/${fileName}`;

    const { data: uploadData, error } = await supabase.storage
      .from('medias')
      .upload(filePath, audioFile);

    if (error) {
      console.error("Storage upload error:", error);
    } else {
      const { data: publicUrlData } = supabase.storage.from('medias').getPublicUrl(filePath);
      audioUrl = publicUrlData.publicUrl;
    }
  }

  const sermon = await prisma.sermon.create({
    data: {
      title,
      preacher,
      duration,
      category,
      audioUrl,
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
