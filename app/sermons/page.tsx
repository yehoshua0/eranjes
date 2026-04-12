import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { PlayCircle, Calendar, User, Search } from "lucide-react";

import { getSermons } from "@/app/actions";

export default async function SermonsPage() {
    const sermons = await getSermons();

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Header Section */}
            <div className="pt-40 pb-20 bg-zinc-900 relative overflow-hidden">
                <Image
                    src="/banner.jpg"
                    alt="Sermons header"
                    fill
                    className="object-cover opacity-20 grayscale"
                />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl text-white mb-6">Sermons</h1>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                        Plongez dans la Parole de Dieu à travers nos enseignements hebdomadaires et laissez-vous transformer par la vérité.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    {/* Filters & Search */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
                        <div className="flex gap-4 overflow-x-auto pb-2 w-full md:w-auto">
                            {["Tous", "Séries", "Thématiques", "Anciens"].map((filter) => (
                                <button key={filter} className="px-6 py-2 border border-zinc-200 rounded-full text-sm font-semibold hover:bg-primary hover:border-primary transition-all whitespace-nowrap">
                                    {filter}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-full md:w-96 border-b-2 border-zinc-100 flex items-center gap-3 py-2">
                            <Search className="text-zinc-400" size={20} />
                            <input type="text" placeholder="Rechercher un message..." className="bg-transparent outline-none w-full text-black" />
                        </div>
                    </div>

                    {/* Sermons Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {sermons.map((sermon) => (
                            <div key={sermon.id} className="group flex flex-col items-center">
                                <Link href={`/sermons/${sermon.id}`} className="relative w-full aspect-video border border-zinc-100 overflow-hidden mb-6 block">
                                    <Image
                                        src="/sermon.jpg"
                                        alt={sermon.title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all"></div>
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                                        <PlayCircle className="text-primary w-16 h-16 shadow-2xl" />
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-primary text-black text-[10px] uppercase tracking-tighter font-bold px-3 py-1">
                                            {sermon.category}
                                        </span>
                                    </div>
                                    {sermon.audioUrl && (
                                        <div className="absolute bottom-4 right-4 bg-green-500 text-white text-[9px] font-black uppercase px-2 py-1 tracking-widest shadow-lg">
                                            Audio disponible
                                        </div>
                                    )}
                                </Link>
                                <div className="text-center space-y-2">
                                    <Link href={`/sermons/${sermon.id}`}>
                                        <h3 className="text-2xl font-heading text-black hover:text-primary transition-colors cursor-pointer">
                                            {sermon.title}
                                        </h3>
                                    </Link>
                                    <div className="flex items-center justify-center gap-4 text-xs text-zinc-500 uppercase tracking-widest font-bold">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} className="text-primary" />
                                            <span>{new Date(sermon.createdAt).toLocaleDateString('fr-FR')}</span>
                                        </div>
                                        <span>|</span>
                                        <div className="flex items-center gap-1">
                                            <User size={14} className="text-primary" />
                                            <span>{sermon.preacher}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-20 flex justify-center gap-2">
                        {[1, 2, 3].map((page) => (
                            <button key={page} className={`w-10 h-10 border border-zinc-200 flex items-center justify-center font-bold transition-all ${page === 1 ? 'bg-black text-white border-black' : 'hover:bg-primary'}`}>
                                {page}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
