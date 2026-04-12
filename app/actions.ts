"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ==================== BLOGS ====================

export async function getBlogs() {
  return await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getBlog(id: string) {
  return await prisma.blog.findUnique({ where: { id } });
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

    const { error } = await supabase.storage
      .from('medias')
      .upload(filePath, coverFile);

    if (error) {
      console.error("❌ ERREUR UPLOAD BLOG IMAGE:", error.message);
      throw new Error(`Erreur upload image: ${error.message}. Vérifiez que le bucket 'medias' existe et est public.`);
    } else {
      const { data: publicUrlData } = supabase.storage.from('medias').getPublicUrl(filePath);
      cover = publicUrlData.publicUrl;
      console.log("✅ Image blog uploadée avec succès:", cover);
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
  revalidatePath("/admin");
  revalidatePath("/blogs");
  return blog;
}

export async function updateBlog(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const author = formData.get("author") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const status = formData.get("status") as string;
  const coverFile = formData.get("cover") as File;

  let cover = undefined;

  if (coverFile && coverFile.size > 0) {
    const { supabase } = await import('@/lib/supabase');
    const fileExt = coverFile.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `blogs/${fileName}`;

    const { error } = await supabase.storage
      .from('medias')
      .upload(filePath, coverFile);

    if (error) {
      console.error("Storage upload error:", error);
    } else {
      const { data: publicUrlData } = supabase.storage.from('medias').getPublicUrl(filePath);
      cover = publicUrlData.publicUrl;
    }
  }

  const blog = await prisma.blog.update({
    where: { id },
    data: {
      title,
      category,
      author,
      content,
      excerpt,
      status,
      ...(cover && { cover }),
    },
  });
  revalidatePath("/admin/blogs");
  revalidatePath("/admin");
  revalidatePath("/blogs");
  return blog;
}

export async function deleteBlog(id: string) {
  await prisma.blog.delete({ where: { id } });
  revalidatePath("/admin/blogs");
  revalidatePath("/admin");
  revalidatePath("/blogs");
}

// ==================== SERMONS ====================

export async function getSermons() {
  return await prisma.sermon.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getSermon(id: string) {
  return await prisma.sermon.findUnique({ where: { id } });
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

    const { error } = await supabase.storage
      .from('medias')
      .upload(filePath, audioFile);

    if (error) {
      console.error("❌ ERREUR UPLOAD SERMON AUDIO:", error.message);
      throw new Error(`Erreur upload audio: ${error.message}. Vérifiez que le bucket 'medias' existe et est public.`);
    } else {
      const { data: publicUrlData } = supabase.storage.from('medias').getPublicUrl(filePath);
      audioUrl = publicUrlData.publicUrl;
      console.log("✅ Audio sermon uploadé avec succès:", audioUrl);
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
  revalidatePath("/admin");
  revalidatePath("/sermons");
  return sermon;
}

export async function updateSermon(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const preacher = formData.get("preacher") as string;
  const duration = formData.get("duration") as string;
  const category = formData.get("category") as string;
  const status = formData.get("status") as string;
  const audioFile = formData.get("audio") as File;

  let audioUrl = undefined;

  if (audioFile && audioFile.size > 0) {
    const { supabase } = await import('@/lib/supabase');
    const fileExt = audioFile.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `sermons/${fileName}`;

    const { error } = await supabase.storage
      .from('medias')
      .upload(filePath, audioFile);

    if (error) {
      console.error("Storage upload error:", error);
    } else {
      const { data: publicUrlData } = supabase.storage.from('medias').getPublicUrl(filePath);
      audioUrl = publicUrlData.publicUrl;
    }
  }

  const sermon = await prisma.sermon.update({
    where: { id },
    data: {
      title,
      preacher,
      duration,
      category,
      status,
      ...(audioUrl && { audioUrl }),
    },
  });
  revalidatePath("/admin/sermons");
  revalidatePath("/admin");
  revalidatePath("/sermons");
  return sermon;
}

export async function deleteSermon(id: string) {
  await prisma.sermon.delete({ where: { id } });
  revalidatePath("/admin/sermons");
  revalidatePath("/admin");
  revalidatePath("/sermons");
}

// ==================== EVENTS ====================

export async function getEvents() {
  return await prisma.event.findMany({
    orderBy: { date: "asc" },
  });
}

export async function getEvent(id: string) {
  return await prisma.event.findUnique({ where: { id } });
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
  revalidatePath("/admin");
  revalidatePath("/evenements");
  return event;
}

export async function updateEvent(id: string, data: { title: string; date: Date; time: string; location: string; category: string; status: string }) {
  const event = await prisma.event.update({
    where: { id },
    data,
  });
  revalidatePath("/admin/evenements");
  revalidatePath("/admin");
  revalidatePath("/evenements");
  return event;
}

export async function deleteEvent(id: string) {
  await prisma.event.delete({ where: { id } });
  revalidatePath("/admin/evenements");
  revalidatePath("/admin");
  revalidatePath("/evenements");
}
