import React from "react";
import { 
  Mic2, 
  Plus, 
  Search, 
  Play, 
  Clock, 
  User, 
  MoreVertical, 
  Edit, 
  Trash2,
  Calendar
} from "lucide-react";
import { getSermons } from "@/app/actions";

export const dynamic = 'force-dynamic';

export default async function AdminSermons() {
  const sermons = await getSermons();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-black">Gestion des Sermons</h1>
          <p className="text-zinc-500 mt-2">Gérez les enregistrements audio et podcasts de l'église.</p>
        </div>
        <button className="bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary hover:text-black transition-all shadow-lg shadow-black/5">
          <Plus size={20} />
          <span>Uploader un Sermon</span>
        </button>
      </div>

      {/* Grid of Sermons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sermons.map((sermon) => (
          <div key={sermon.id} className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden group hover:shadow-md transition-all">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`
                  p-3 rounded-xl 
                  ${sermon.status === "Publié" ? "bg-primary/10 text-primary" : "bg-zinc-100 text-zinc-400"}
                `}>
                  <Mic2 size={24} />
                </div>
                <button className="p-2 text-zinc-400 hover:text-black hover:bg-zinc-50 rounded-lg transition-all">
                  <MoreVertical size={18} />
                </button>
              </div>

              <h3 className="text-lg font-bold group-hover:text-primary transition-colors mb-2 cursor-pointer">{sermon.title}</h3>
              
              <div className="space-y-3 mt-4">
                <div className="flex items-center gap-2 text-xs text-zinc-500 font-bold">
                  <User size={14} className="text-zinc-400" />
                  <span>{sermon.preacher}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500 font-bold">
                  <Calendar size={14} className="text-zinc-400" />
                  <span>{sermon.createdAt.toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500 font-bold">
                  <Clock size={14} className="text-zinc-400" />
                  <span>{sermon.duration}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-zinc-50 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{sermon.status}</span>
                 </div>
                 <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-400">
                    <Play size={12} fill="currentColor" /> {sermon.listeners} écoutes
                 </div>
              </div>
            </div>
            
            <div className="bg-zinc-50 px-6 py-4 flex gap-2">
              <button className="flex-grow bg-white border border-zinc-200 py-2 rounded-lg text-xs font-bold hover:bg-black hover:text-white hover:border-black transition-all flex items-center justify-center gap-2">
                <Edit size={14} /> Modifier
              </button>
              <button className="p-2 bg-white border border-zinc-200 rounded-lg text-red-500 hover:bg-red-50 hover:border-red-100 transition-all">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
