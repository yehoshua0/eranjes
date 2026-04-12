import React from "react";
import {
  Users,
  TrendingUp,
  FileText,
  ArrowUpRight,
  Plus,
  Mic2,
  Calendar
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ActionLink } from "./ClientComponents";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const blogCount = await prisma.blog.count();
  const sermonCount = await prisma.sermon.count();
  const eventCount = await prisma.event.count();
  const sermonListeners = await prisma.sermon.aggregate({ _sum: { listeners: true } });
  const blogViews = await prisma.blog.aggregate({ _sum: { views: true } });
  const eventRegs = await prisma.event.aggregate({ _sum: { registrations: true } });
  const recentPosts = await prisma.blog.findMany({ orderBy: { createdAt: 'desc' }, take: 5 });
  const upcomingEvents = await prisma.event.findMany({ orderBy: { date: 'asc' }, take: 3 });

  const stats = [
    { label: "Articles Publiés", value: blogCount, icon: <FileText className="text-purple-500" /> },
    { label: "Sermons", value: sermonCount, icon: <Mic2 className="text-orange-500" /> },
    { label: "Événements", value: eventCount, icon: <Calendar className="text-blue-500" /> },
    { label: "Total Vues Blog", value: blogViews._sum.views ?? 0, icon: <TrendingUp className="text-green-500" /> },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-black">Tableau de Bord</h1>
          <p className="text-zinc-500 mt-2">Bienvenue sur l&apos;interface de gestion ERANJES.</p>
        </div>
        <ActionLink href="/admin/blogs" className="w-full md:w-auto bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-black transition-all group">
          <Plus size={20} />
          <span>Nouveau Contenu</span>
        </ActionLink>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-zinc-50 rounded-xl">
                {stat.icon}
              </div>
            </div>
            <p className="text-zinc-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-black mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-50 flex justify-between items-center">
            <h3 className="text-lg font-bold">Articles Récents</h3>
            <ActionLink href="/admin/blogs" className="text-zinc-400 font-bold text-xs uppercase tracking-widest hover:text-black">Voir tout</ActionLink>
          </div>
          <div className="divide-y divide-zinc-50">
            {recentPosts.length === 0 && (
              <div className="p-8 text-center text-zinc-400 text-sm">
                Aucun article. Créez votre premier article depuis la page Blogs.
              </div>
            )}
            {recentPosts.map((post) => (
              <div key={post.id} className="p-6 flex items-center justify-between group hover:bg-zinc-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200">
                     <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-black">
                        {post.title.charAt(0)}
                     </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{post.title}</h4>
                    <p className="text-xs text-zinc-400 mt-1 font-medium">{post.createdAt.toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">{post.views}</p>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Vues</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-primary p-8 rounded-2xl shadow-xl shadow-primary/20 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-black leading-tight">Prêt à diffuser un nouveau message ?</h3>
              <p className="text-black/60 text-sm mt-2 mb-6">Ajoutez un nouveau sermon en quelques clics.</p>
              <ActionLink href="/admin/sermons" className="w-full bg-black text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 group-hover:scale-105 transition-transform">
                <Mic2 size={18} /> Uploader un Sermon
              </ActionLink>
            </div>
            <div className="absolute -bottom-6 -right-6 text-black/5 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                <Mic2 size={160} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Prochains Événements</h3>
              <ActionLink href="/admin/evenements" className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest hover:text-black">Tout voir</ActionLink>
            </div>
            <div className="space-y-4">
              {upcomingEvents.length === 0 && (
                <p className="text-sm text-zinc-400">Aucun événement planifié.</p>
              )}
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-zinc-50 rounded-lg border border-zinc-100 flex flex-col items-center justify-center">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase">{event.date.toLocaleDateString('fr-FR', { month: 'short' })}</p>
                    <p className="text-lg font-black text-black -mt-1">{event.date.getDate()}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{event.title}</h4>
                    <p className="text-xs text-zinc-400 font-medium">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
