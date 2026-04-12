"use client";

import React, { useState } from "react";
import { Plus, Trash2, Loader2, X, Edit } from "lucide-react";
import { createBlog, deleteBlog, updateBlog } from "@/app/actions";
import { useRouter } from "next/navigation";

export function CreateBlogDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await createBlog(formData);
    setLoading(false);
    setIsOpen(false);
    router.refresh();
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary hover:text-black transition-all shadow-lg shadow-black/5"
      >
        <Plus size={20} />
        <span>Créer un Article</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-full transition-colors">
              <X size={20} />
            </button>
            <h2 className="text-2xl font-black mb-6">Ajouter un Article</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Titre</label>
                <input required name="title" type="text" className="w-full mt-1 px-4 py-3 bg-zinc-50 border-none rounded-xl outline-none text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Titre principal de l'article" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Auteur</label>
                  <input required name="author" type="text" className="w-full mt-1 px-4 py-3 bg-zinc-50 border-none rounded-xl outline-none text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Nom de l'auteur" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Catégorie</label>
                  <select required name="category" className="w-full mt-1 px-4 py-3 bg-zinc-50 border-none rounded-xl outline-none text-sm focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer">
                    <option value="Croissance">Croissance Spirituelle</option>
                    <option value="Communauté">Communauté</option>
                    <option value="Jeunesse">Jeunesse</option>
                    <option value="Témoignage">Témoignage</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Extrait</label>
                <textarea required name="excerpt" rows={2} className="w-full mt-1 px-4 py-3 bg-zinc-50 border-none rounded-xl outline-none text-sm focus:ring-2 focus:ring-primary/20 transition-all resize-none" placeholder="Résumé court..." />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Image de couverture</label>
                <input name="cover" type="file" accept="image/*" className="w-full mt-1 px-4 py-3 bg-zinc-50 border-none rounded-xl outline-none text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary cursor-pointer" />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Contenu</label>
                <textarea required name="content" rows={6} className="w-full mt-1 px-4 py-3 bg-zinc-50 border-none rounded-xl outline-none text-sm focus:ring-2 focus:ring-primary/20 transition-all resize-none" placeholder="Contenu complet de l'article..." />
              </div>

              <button disabled={loading} type="submit" className="w-full mt-4 bg-black text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-black transition-all disabled:opacity-50">
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Publier l'Article"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

interface BlogData {
  id: string;
  title: string;
  excerpt: string | null;
  content: string;
  category: string;
  author: string;
  status: string;
}

export function EditBlogButton({ blog }: { blog: BlogData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await updateBlog(blog.id, formData);
    setLoading(false);
    setIsOpen(false);
    router.refresh();
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="p-2 text-zinc-400 hover:text-black hover:bg-zinc-200 rounded-lg transition-all">
        <Edit size={16} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-full transition-colors">
              <X size={20} />
            </button>
            <h2 className="text-2xl font-black mb-6">Modifier l&apos;Article</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Titre</label>
                <input required name="title" type="text" defaultValue={blog.title} className="w-full mt-1 px-4 py-3 bg-zinc-50 border-none rounded-xl outline-none text-sm focus:ring-2 focus:ring-primary/20 transition-all" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Auteur</label>
                  <input required name="author" type="text" defaultValue={blog.author} className="w-full mt-1 px-4 py-3 bg-zinc-50 border-none rounded-xl outline-none text-sm focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Catégorie</label>
                  <select required name="category" defaultValue={blog.category} className="w-full mt-1 px-4 py-3 bg-zinc-50 border-none rounded-xl outline-none text-sm focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer">
                    <option value="Croissance">Croissance Spirituelle</option>
                    <option value="Communauté">Communauté</option>
                    <option value="Jeunesse">Jeunesse</option>
                    <option value="Témoignage">Témoignage</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Statut</label>
                <select required name="status" defaultValue={blog.status} className="w-full mt-1 px-4 py-3 bg-zinc-50 border-none rounded-xl outline-none text-sm focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer">
                  <option value="Publié">Publié</option>
                  <option value="Brouillon">Brouillon</option>
                  <option value="Archivé">Archivé</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Extrait</label>
                <textarea required name="excerpt" rows={2} defaultValue={blog.excerpt ?? ""} className="w-full mt-1 px-4 py-3 bg-zinc-50 border-none rounded-xl outline-none text-sm focus:ring-2 focus:ring-primary/20 transition-all resize-none" />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Nouvelle image de couverture (optionnel)</label>
                <input name="cover" type="file" accept="image/*" className="w-full mt-1 px-4 py-3 bg-zinc-50 border-none rounded-xl outline-none text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary cursor-pointer" />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Contenu</label>
                <textarea required name="content" rows={6} defaultValue={blog.content} className="w-full mt-1 px-4 py-3 bg-zinc-50 border-none rounded-xl outline-none text-sm focus:ring-2 focus:ring-primary/20 transition-all resize-none" />
              </div>

              <button disabled={loading} type="submit" className="w-full mt-4 bg-black text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-black transition-all disabled:opacity-50">
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Sauvegarder les Modifications"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export function DeleteBlogButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (confirm("Voulez-vous vraiment supprimer cet article ?")) {
      setLoading(true);
      await deleteBlog(id);
      setLoading(false);
      router.refresh();
    }
  }

  return (
    <button disabled={loading} onClick={handleDelete} className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50">
      {loading ? <Loader2 className="animate-spin" size={16} /> : <Trash2 size={16} />}
    </button>
  );
}
