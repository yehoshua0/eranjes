import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Music } from "lucide-react";
import SermonPlayer from "@/components/SermonPlayer";

export default async function SermonDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const sermon = await prisma.sermon.findUnique({
        where: { id }
    });

    if (!sermon) {
        notFound();
    }

    // Dynamic increment of listeners
    try {
        await prisma.sermon.update({
            where: { id },
            data: { listeners: { increment: 1 } }
        });
    } catch(e) {
        console.error("Failed to update listeners count");
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Header Section */}
            <div className="pt-40 pb-20 bg-zinc-900 relative overflow-hidden">
                <Image
                    src="/sermon.jpg"
                    alt={sermon.title}
                    fill
                    className="object-cover opacity-30 grayscale"
                />
                <div className="container mx-auto px-6 relative z-10 text-center space-y-6">
                    <Link href="/sermons" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4 font-bold uppercase text-[10px] tracking-widest">
                        <ArrowLeft size={16} /> Retour aux sermons
                    </Link>
                    <h1 className="text-4xl md:text-6xl text-white font-heading">{sermon.title}</h1>
                    <div className="flex items-center justify-center gap-6 text-xs text-primary uppercase tracking-[0.2em] font-bold">
                        <div className="flex items-center gap-2">
                            <Calendar size={14} />
                            <span>{new Date(sermon.createdAt).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                            <User size={14} className="text-primary" />
                            <span>{sermon.preacher}</span>
                        </div>
                    </div>
                </div>
            </div>

            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                            {/* Description */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-heading text-black">À propos de ce message</h2>
                                    <p className="text-zinc-600 leading-relaxed text-lg italic">
                                        Ce message a été apporté par {sermon.preacher}. Écoutez et soyez bénis.
                                    </p>
                                </div>

                                <SermonPlayer
                                    title={sermon.title}
                                    audioUrl={sermon.audioUrl}
                                    duration={sermon.duration}
                                />

                                <div className="p-8 bg-primary/5 border border-primary/20 rounded-sm">
                                    <p className="text-sm text-zinc-600 italic">
                                        <strong>Note :</strong> Les vidéos ne sont pas encore disponibles pour ce sermon. Nous travaillons sur l&apos;acquisition de matériel audiovisuel pour améliorer votre expérience. Merci de votre patience.
                                    </p>
                                </div>
                            </div>

                            {/* Sidebar / Info */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-40 space-y-8">
                                    <div className="aspect-[3/4] relative overflow-hidden border border-zinc-100">
                                        <Image
                                            src="/sermon.jpg"
                                            alt="Speaker"
                                            fill
                                            className="object-cover grayscale"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black to-transparent">
                                            <p className="text-white font-heading text-xl">{sermon.preacher}</p>
                                            <p className="text-primary text-[10px] font-bold uppercase tracking-[0.2em]">Pasteur Principal</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="font-heading text-black">Partager ce message</h4>
                                        <div className="flex gap-2">
                                            <button className="w-10 h-10 border border-zinc-200 flex items-center justify-center hover:bg-primary transition-all">
                                                <span className="text-xs font-bold">FB</span>
                                            </button>
                                            <button className="w-10 h-10 border border-zinc-200 flex items-center justify-center hover:bg-primary transition-all">
                                                <span className="text-xs font-bold">WA</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
