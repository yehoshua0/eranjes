"use client";

import React from "react";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Save 
} from "lucide-react";

export default function AdminSettings() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-4xl font-black text-black">Paramètres</h1>
        <p className="text-zinc-500 mt-2">Configurez les options générales de votre site.</p>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4">
          <aside className="border-b md:border-b-0 md:border-r border-zinc-100 p-4 md:p-6 flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible no-scrollbar">
            <SettingsTab icon={<User size={18} />} label="Profil" active />
            <SettingsTab icon={<Globe size={18} />} label="Général" />
            <SettingsTab icon={<Bell size={18} />} label="Notifications" />
            <SettingsTab icon={<Shield size={18} />} label="Sécurité" />
          </aside>

          <div className="md:col-span-3 p-8 space-y-8">
            <section className="space-y-6">
              <h3 className="text-xl font-bold">Informations de l'Église</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Nom de l'Organisation</label>
                  <input type="text" defaultValue="ERANJES" className="w-full px-4 py-3 bg-zinc-50 border-none rounded-xl outline-none text-sm focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Email de Contact</label>
                  <input type="email" defaultValue="contact@eranjes.org" className="w-full px-4 py-3 bg-zinc-50 border-none rounded-xl outline-none text-sm focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Adresse</label>
                  <textarea rows={3} defaultValue="Boulevard de la Liberté, No 123" className="w-full px-4 py-3 bg-zinc-50 border-none rounded-xl outline-none text-sm focus:ring-2 focus:ring-primary/20 transition-all resize-none"></textarea>
                </div>
              </div>
            </section>

            <section className="pt-8 border-t border-zinc-100 flex justify-end">
              <button className="bg-black text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary hover:text-black transition-all">
                <Save size={20} />
                Sauvegarder les modifications
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsTab({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button className={`
      flex-shrink-0 md:w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap
      ${active ? "bg-primary/10 text-black" : "text-zinc-500 hover:bg-zinc-50"}
    `}>
      {icon}
      {label}
    </button>
  );
}
