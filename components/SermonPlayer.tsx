"use client";

import { Play, Volume2, Download, Music, Pause, Loader2 } from "lucide-react";
import { useState, useRef } from "react";

export default function SermonPlayer({ title, audioUrl, duration }: { title: string, audioUrl: string | null, duration: string }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [loading, setLoading] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const togglePlay = () => {
        if (!audioUrl || !audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    if (!audioUrl) {
        return (
            <div className="p-8 bg-zinc-50 border border-zinc-100 flex flex-col items-center justify-center text-center">
                <Music className="text-zinc-200 mb-4" size={48} />
                <h4 className="font-heading text-lg text-zinc-400">Aucun enregistrement disponible</h4>
                <p className="text-sm text-zinc-400 mt-1">Ce sermon n'a pas encore de fichier audio associé.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-heading text-black border-b border-zinc-100 pb-4 flex items-center gap-3">
                <Music className="text-primary" size={24} />
                Enregistrement audio
            </h3>

            <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-zinc-50 border border-zinc-100 group transition-all hover:border-primary">
                <div className="flex items-center gap-6 mb-4 md:mb-0">
                    <button
                        onClick={togglePlay}
                        className="w-14 h-14 bg-black flex items-center justify-center rounded-full text-white group-hover:bg-primary group-hover:text-black transition-colors"
                    >
                        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                    </button>
                    <div>
                        <h4 className="font-heading text-lg text-black">{title}</h4>
                        <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase">{duration} • Qualité Studio</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <a
                        href={audioUrl}
                        download
                        target="_blank"
                        className="flex items-center gap-2 bg-black text-white px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary hover:text-black transition-all"
                    >
                        <Download size={14} /> Télécharger
                    </a>
                </div>
            </div>

            <audio
                ref={audioRef}
                src={audioUrl}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
            />
        </div>
    );
}
