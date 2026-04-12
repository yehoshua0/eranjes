import React from "react";
import { 
  FileText, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Eye,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { getBlogs } from "@/app/actions";
import { CreateBlogDialog, DeleteBlogButton } from "./ClientComponents";
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
      <div className="bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Rechercher un article..." 
            className="w-full pl-12 pr-4 py-3 bg-zinc-50 border-none rounded-xl outline-none text-sm focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl text-sm font-bold text-zinc-600 hover:bg-zinc-100 transition-colors flex-grow md:flex-grow-0 justify-center">
            <Filter size={18} />
            Filtrer
          </button>
          <select className="px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl text-sm font-bold text-zinc-600 outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer pr-10 relative">
            <option>Tous les statuts</option>
            <option>Publié</option>
            <option>Brouillon</option>
            <option>Archivé</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-100">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Article</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Catégorie</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Auteur</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Date</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Statut</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-zinc-50/50 transition-colors group">
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-400 font-bold">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-sm group-hover:text-primary transition-colors cursor-pointer">{blog.title}</p>
                        <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
                          <Eye size={12} /> {blog.views} vues
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="px-3 py-1 bg-zinc-100 text-[10px] font-bold uppercase tracking-widest text-zinc-500 rounded-full">
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
                      <UnderConstructionButton className="p-2 text-zinc-400 hover:text-black hover:bg-zinc-200 rounded-lg transition-all">
                        <Edit size={16} />
                      </UnderConstructionButton>
                      <DeleteBlogButton id={blog.id} />
                      <UnderConstructionButton className="p-2 text-zinc-400 hover:text-black hover:bg-zinc-200 rounded-lg transition-all">
                        <MoreVertical size={16} />
                      </UnderConstructionButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-zinc-50 flex items-center justify-between">
          <p className="text-xs text-zinc-400 font-medium">Affichage de 1-3 sur 48 articles</p>
          <div className="flex gap-2">
            <button className="p-2 border border-zinc-100 rounded-lg text-zinc-400 hover:border-black hover:text-black transition-all disabled:opacity-30" disabled>
              <ChevronLeft size={18} />
            </button>
            <button className="p-2 border border-zinc-200 rounded-lg text-black hover:bg-zinc-50 transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
