"use client";

import React, { useState } from "react";
import { Plus, Trash2, Loader2, X } from "lucide-react";
import { createSermon, deleteSermon } from "@/app/actions";
import { useRouter } from "next/navigation";

export function CreateSermonDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    await createSermon(formData);
    
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
        <span>Uploader un Sermon</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-full transition-colors">
              <X size={20} />
            </button>
            <h2 className="text-2xl font-black mb-6">Ajouter un Sermon</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Titre Exact</label>
                <input required name="title" type="text" className="w-full mt-1 px-4 py-3 bg-zinc-50 border-none rounded-xl outline-none text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Titre du message" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Orateur</label>
                  <input required name="preacher" type="text" className="w-full mt-1 px-4 py-3 bg-zinc-50 border-none rounded-xl outline-none text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Prédicateur" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Durée (Min:Sec)</label>
                  <input required name="duration" type="text" className="w-full mt-1 px-4 py-3 bg-zinc-50 border-none rounded-xl outline-none text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="45:20" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Fichier Audio (MP3/WAV)</label>
                <input name="audio" type="file" accept="audio/*" className="w-full mt-1 px-4 py-3 bg-zinc-50 border-none rounded-xl outline-none text-sm focus:ring-2 focus:ring-primary/20 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" />
                <p className="text-[10px] text-zinc-500 mt-2">Maximum 50MB. (Nécessite Supabase Storage)</p>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Catégorie</label>
                <select required name="category" className="w-full mt-1 px-4 py-3 bg-zinc-50 border-none rounded-xl outline-none text-sm focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer">
                  <option value="Enseignement">Enseignement</option>
                  <option value="Exhortation">Exhortation</option>
                  <option value="Doctrine">Doctrine</option>
                  <option value="Témoignage">Témoignage</option>
                </select>
              </div>

              <button 
                disabled={loading}
                type="submit" 
                className="w-full mt-4 bg-black text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-black transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Créer le Sermon"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export function DeleteSermonButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (confirm("Voulez-vous vraiment supprimer ce sermon ?")) {
      setLoading(true);
      await deleteSermon(id);
      setLoading(false);
      router.refresh();
    }
  }

  return (
    <button 
      disabled={loading}
      onClick={handleDelete}
      className="p-2 bg-white border border-zinc-200 rounded-lg text-red-500 hover:bg-red-50 hover:border-red-100 transition-all disabled:opacity-50 flex items-center justify-center"
    >
      {loading ? <Loader2 className="animate-spin" size={14} /> : <Trash2 size={14} />}
    </button>
  );
}
