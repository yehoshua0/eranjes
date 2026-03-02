"use client";

import { Play, Volume2, Download, Music } from "lucide-react";
import { useState, useRef } from "react";

export default function SermonPlayer({ sermon }: { sermon: any }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

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
        <div className="space-y-6">
            <h3 className="text-xl font-heading text-black border-b border-zinc-100 pb-4 flex items-center gap-3">
                <Music className="text-primary" size={24} />
                Enregistrements audio
            </h3>

            <div className="space-y-4">
                {sermon.audioList.map((audio: any, index: number) => (
                    <div key={index} className="flex flex-col md:flex-row items-center justify-between p-6 bg-zinc-50 border border-zinc-100 group transition-all hover:border-primary">
                        <div className="flex items-center gap-6 mb-4 md:mb-0">
                            <button
                                onClick={togglePlay}
                                className="w-12 h-12 bg-black flex items-center justify-center rounded-full text-white group-hover:bg-primary group-hover:text-black transition-colors"
                            >
                                <Play size={18} fill="currentColor" />
                            </button>
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

            {/* Native audio element hidden */}
            <audio ref={audioRef} onEnded={() => setIsPlaying(false)} className="hidden" />
        </div>
    );
}
