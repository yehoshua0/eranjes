import React from "react";
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2,
  Users
} from "lucide-react";
import { getEvents } from "@/app/actions";

export const dynamic = 'force-dynamic';

export default async function AdminEvenements() {
  const events = await getEvents();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-black">Événements</h1>
          <p className="text-zinc-500 mt-2">Planifiez et gérez le calendrier de l'église.</p>
        </div>
        <button className="bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary hover:text-black transition-all shadow-lg shadow-black/5">
          <Plus size={20} />
          <span>Nouvel Événement</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-100">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Événement</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Date & Heure</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Lieu</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Inscrits</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Statut</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-zinc-50/50 transition-colors group">
                  <td className="px-6 py-6">
                    <div>
                      <p className="font-bold text-sm group-hover:text-primary transition-colors cursor-pointer">{event.title}</p>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{event.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 font-medium">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm text-black">{event.date.toLocaleDateString('fr-FR')}</p>
                      <p className="text-xs text-zinc-400 font-bold">{event.time}</p>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2 text-sm text-zinc-600">
                      <MapPin size={14} className="text-zinc-400" />
                      {event.location}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <Users size={14} className="text-zinc-400" />
                      {event.registrations}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`
                      px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest
                      ${event.status === "À venir" ? "bg-blue-100 text-blue-600" : 
                        event.status === "Planifié" ? "bg-purple-100 text-purple-600" : 
                        "bg-zinc-100 text-zinc-500"}
                    `}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <button className="p-2 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-lg transition-all">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
