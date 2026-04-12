import React from "react";
import {
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  Search,
  Users
} from "lucide-react";
import { getEvents } from "@/app/actions";
import { CreateEventDialog, DeleteEventButton, EditEventButton } from "./ClientComponents";

export const dynamic = 'force-dynamic';

export default async function AdminEvenements() {
  const events = await getEvents();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-black">Événements</h1>
          <p className="text-zinc-500 mt-2">Planifiez et gérez le calendrier de l&apos;église.</p>
        </div>
        <CreateEventDialog />
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="border-b border-zinc-100">
              <tr>
                <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-400">Événement</th>
                <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-400">Date & Heure</th>
                <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-400">Lieu</th>
                <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-400">Inscriptions</th>
                <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-400">Statut</th>
                <th className="px-6 py-5 text-right text-[10px] font-bold uppercase tracking-widest text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {events.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-zinc-400 font-medium">
                    <CalendarIcon size={40} className="mx-auto mb-3 text-zinc-200" />
                    Aucun événement pour le moment. Créez-en un !
                  </td>
                </tr>
              )}
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-black">
                        <CalendarIcon size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{event.title}</h4>
                        <p className="text-[10px] text-zinc-400 mt-0.5 font-bold uppercase tracking-widest">{event.category}</p>
                      </div>
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
                        event.status === "Planifié" ? "bg-orange-100 text-orange-600" :
                        "bg-zinc-100 text-zinc-500"}
                    `}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <EditEventButton event={event} />
                       <DeleteEventButton id={event.id} />
                    </div>
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
