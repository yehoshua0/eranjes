"use client";

import React, { useState } from "react";
import { Plus, Trash2, Loader2, X } from "lucide-react";
import { createEvent, deleteEvent } from "@/app/actions";
import { useRouter } from "next/navigation";

export function CreateEventDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    await createEvent({
      title: formData.get("title") as string,
      date: new Date(formData.get("date") as string),
      time: formData.get("time") as string,
      location: formData.get("location") as string,
      category: formData.get("category") as string,
    });
    
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
        <span>Nouvel Événement</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-full transition-colors">
              <X size={20} />
            </button>
            <h2 className="text-2xl font-black mb-6">Ajouter un Événement</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Titre</label>
                <input required name="title" type="text" className="w-full mt-1 px-4 py-3 bg-zinc-50 border-none rounded-xl outline-none text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Ex: Culte de Pâques" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Date</label>
                  <input required name="date" type="date" className="w-full mt-1 px-4 py-3 bg-zinc-50 border-none rounded-xl outline-none text-sm focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Heure</label>
                  <input required name="time" type="text" className="w-full mt-1 px-4 py-3 bg-zinc-50 border-none rounded-xl outline-none text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="09:00 - 12:00" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Lieu</label>
                <input required name="location" type="text" className="w-full mt-1 px-4 py-3 bg-zinc-50 border-none rounded-xl outline-none text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Temple Central" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Catégorie</label>
                <select required name="category" className="w-full mt-1 px-4 py-3 bg-zinc-50 border-none rounded-xl outline-none text-sm focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer">
                  <option value="Culte">Culte</option>
                  <option value="Événement Spécial">Événement Spécial</option>
                  <option value="Action">Action Sociale</option>
                  <option value="Jeunesse">Jeunesse</option>
                </select>
              </div>

              <button 
                disabled={loading}
                type="submit" 
                className="w-full mt-4 bg-black text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-black transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Créer l'Événement"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export function DeleteEventButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (confirm("Voulez-vous vraiment supprimer cet événement ?")) {
      setLoading(true);
      await deleteEvent(id);
      setLoading(false);
      router.refresh();
    }
  }

  return (
    <button 
      disabled={loading}
      onClick={handleDelete}
      className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
    >
      {loading ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
    </button>
  );
}
