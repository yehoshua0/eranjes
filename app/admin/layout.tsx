"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Mic2, 
  Calendar, 
  Settings, 
  LogOut,
  Bell,
  Search,
  User,
  Menu,
  X
} from "lucide-react";
import { UnderConstructionButton } from "./ClientComponents";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8F9FA] text-[#1A1A1A] overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-white border-r border-zinc-200 flex flex-col z-50 transition-transform duration-300 lg:relative lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="p-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter">ERANJES</span>
            <span className="bg-primary px-2 py-0.5 text-[10px] font-bold rounded">ADMIN</span>
          </Link>
          <button 
            className="lg:hidden p-2 text-zinc-400 hover:text-black transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-grow px-4 space-y-2 overflow-y-auto">
          <SidebarLink href="/admin" icon={<LayoutDashboard size={20} />} label="Dashboard" active={pathname === "/admin"} onClick={() => setIsSidebarOpen(false)} />
          <SidebarLink href="/admin/blogs" icon={<FileText size={20} />} label="Blogs" active={pathname.startsWith("/admin/blogs")} onClick={() => setIsSidebarOpen(false)} />
          <SidebarLink href="/admin/sermons" icon={<Mic2 size={20} />} label="Sermons" active={pathname.startsWith("/admin/sermons")} onClick={() => setIsSidebarOpen(false)} />
          <SidebarLink href="/admin/evenements" icon={<Calendar size={20} />} label="Événements" active={pathname.startsWith("/admin/evenements")} onClick={() => setIsSidebarOpen(false)} />
        </nav>

        <div className="p-4 border-t border-zinc-100">
          <SidebarLink href="/admin/settings" icon={<Settings size={20} />} label="Paramètres" active={pathname.startsWith("/admin/settings")} onClick={() => setIsSidebarOpen(false)} />
          <SidebarLink href="/" icon={<LogOut size={20} />} label="Déconnexion" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-zinc-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-zinc-500 hover:bg-zinc-100 rounded-lg transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center gap-4 bg-zinc-100 px-4 py-2 rounded-full w-64 lg:w-96">
              <Search size={18} className="text-zinc-400" />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="bg-transparent border-none outline-none text-sm w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            <UnderConstructionButton className="relative p-2 text-zinc-500 hover:bg-zinc-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </UnderConstructionButton>
            <div className="flex items-center gap-3 md:pl-6 md:border-l border-zinc-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">Admin</p>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Super User</p>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-zinc-200 rounded-full overflow-hidden border border-zinc-300">
                <User size={40} className="text-zinc-400 mt-2" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-grow overflow-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ href, icon, label, active = false, onClick }: { 
  href: string; 
  icon: React.ReactNode; 
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link 
      href={href}
      onClick={onClick}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all
        ${active 
          ? "bg-primary text-black shadow-lg shadow-primary/20" 
          : "text-zinc-500 hover:bg-zinc-50 hover:text-black"}
      `}
    >
      {icon}
      <span>{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 bg-black rounded-full"></div>}
    </Link>
  );
}
