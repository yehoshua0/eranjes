"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, User, Play, Pause, Volume2, Download, Music } from "lucide-react";
import { useState, useRef } from "react";

export default function SermonDetailPage() {
    const params = useParams();
    const id = params.id;
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Simulate database
    const sermons = [
        {
            id: "1",
            title: "La Puissance de la Résurrection",
            date: "3 Mars 2024",
            speaker: "Pasteur Jean",
            category: "Foi",
            description: "Un message puissant sur l'espoir et la vie nouvelle que nous recevons à travers la résurrection du Christ. Découvrez comment cette puissance agit encore aujourd'hui dans nos vies quotidiennes.",
            image: "/sermon.jpg",
            audioList: [
                { title: "Partie 1 : Le tombeau vide", duration: "15:45", size: "14.5 MB" },
                { title: "Partie 2 : La victoire sur la mort", duration: "22:10", size: "20.2 MB" },
                { title: "Partie 3 : Vivre en homme nouveau", duration: "18:30", size: "16.8 MB" }
            ]
        },
        {
            id: "2",
            title: "Marcher dans l'Esprit",
            date: "25 Février 2024",
            speaker: "Pasteur Marc",
            category: "Vie Chrétienne",
            description: "Comment discerner la voix de l'Esprit au milieu du bruit du monde ? Ce sermon explore les clés pratiques pour une vie quotidienne guidée par le Saint-Esprit.",
            image: "/sermon.jpg",
            audioList: [
                { title: "Enseignement complet", duration: "52:15", size: "48.5 MB" }
            ]
        }
    ];

    const sermon = sermons.find(s => s.id === id) || sermons[0];

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Header Section */}
            <div className="pt-40 pb-20 bg-zinc-900 relative overflow-hidden">
                <Image
                    src={sermon.image}
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
                            <span>{sermon.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                            <User size={14} className="text-primary" />
                            <span>{sermon.speaker}</span>
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
                                        "{sermon.description}"
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xl font-heading text-black border-b border-zinc-100 pb-4 flex items-center gap-3">
                                        <Music className="text-primary" size={24} />
                                        Enregistrements audio
                                    </h3>

                                    <div className="space-y-4">
                                        {sermon.audioList.map((audio, index) => (
                                            <div key={index} className="flex flex-col md:flex-row items-center justify-between p-6 bg-zinc-50 border border-zinc-100 group transition-all hover:border-primary">
                                                <div className="flex items-center gap-6 mb-4 md:mb-0">
                                                    <div className="w-12 h-12 bg-black flex items-center justify-center rounded-full text-white group-hover:bg-primary group-hover:text-black transition-colors">
                                                        <Play size={18} fill="currentColor" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-heading text-lg text-black">{audio.title}</h4>
                                                        <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase">{audio.duration} • {audio.size}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-600 hover:text-black transition-colors">
                                                        <Volume2 size={16} /> Écouter
                                                    </button>
                                                    <button className="flex items-center gap-2 bg-black text-white px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary hover:text-black transition-all">
                                                        <Download size={14} /> Télécharger
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-8 bg-primary/5 border border-primary/20 rounded-sm">
                                    <p className="text-sm text-zinc-600 italic">
                                        <strong>Note :</strong> Les vidéos ne sont pas encore disponibles pour ce sermon. Nous travaillons sur l'acquisition de matériel audiovisuel pour améliorer votre expérience. Merci de votre patience.
                                    </p>
                                </div>
                            </div>

                            {/* Sidebar / Info */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-40 space-y-8">
                                    <div className="aspect-[3/4] relative overflow-hidden border border-zinc-100">
                                        <Image
                                            src={sermon.image}
                                            alt="Speaker"
                                            fill
                                            className="object-cover grayscale"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black to-transparent">
                                            <p className="text-white font-heading text-xl">{sermon.speaker}</p>
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
