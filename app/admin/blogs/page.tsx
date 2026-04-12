import React from "react";
import {
  FileText,
  Search,
  Filter,
  MoreVertical,
  Eye,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { getBlogs } from "@/app/actions";
import { CreateBlogDialog, DeleteBlogButton, EditBlogButton } from "./ClientComponents";
import { UnderConstructionButton } from "../ClientComponents";

export const dynamic = 'force-dynamic';

export default async function AdminBlogs() {
  const blogs = await getBlogs();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-black">Gestion des Blogs</h1>
          <p className="text-zinc-500 mt-2">Créez, modifiez et organisez vos articles de blog.</p>
        </div>
        <CreateBlogDialog />
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center bg-white border border-zinc-200 rounded-xl px-4 py-3 gap-3 flex-grow">
          <Search size={18} className="text-zinc-400" />
          <input type="text" placeholder="Rechercher un article..." className="bg-transparent border-none outline-none w-full text-sm" />
        </div>
        <UnderConstructionButton className="flex items-center gap-2 bg-white border border-zinc-200 rounded-xl px-6 py-3 text-sm font-bold text-zinc-600 hover:bg-zinc-50 transition-all">
          <Filter size={16} /> Filtrer
        </UnderConstructionButton>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="border-b border-zinc-100">
              <tr>
                <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-400">Article</th>
                <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-400">Catégorie</th>
                <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-400">Auteur</th>
                <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-400">Date</th>
                <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-400">Statut</th>
                <th className="px-6 py-5 text-right text-[10px] font-bold uppercase tracking-widest text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {blogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-zinc-400 font-medium">
                    <FileText size={40} className="mx-auto mb-3 text-zinc-200" />
                    Aucun article pour le moment. Créez-en un !
                  </td>
                </tr>
              )}
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-black text-lg">
                        {blog.title.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{blog.title}</h4>
                        <p className="text-[10px] text-zinc-400 mt-0.5 font-bold uppercase tracking-widest flex items-center gap-1">
                          <Eye size={10} /> {blog.views} vues
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="px-3 py-1 bg-zinc-100 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-sm font-medium text-zinc-600">{blog.author}</td>
                  <td className="px-6 py-6 text-sm text-zinc-400">{blog.createdAt.toLocaleDateString('fr-FR')}</td>
                  <td className="px-6 py-6">
                    <span className={`
                      px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest
                      ${blog.status === "Publié" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"}
                    `}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center justify-end gap-2">
                      <EditBlogButton blog={blog} />
                      <DeleteBlogButton id={blog.id} />
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
