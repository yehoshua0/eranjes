import Image from "next/image";
import Link from "next/link";

import { getSermons } from "@/app/actions";

export default async function Sermons() {
    const allSermons = await getSermons();
    const sermons = allSermons.slice(0, 3);

    return (
        <section id="sermons" className="py-24 bg-white text-black">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center mb-16 text-center">
                    <div className="w-20 h-1 bg-primary mb-4"></div>
                    <h2 className="text-4xl md:text-5xl font-heading text-black">Sermons récents</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {sermons.map((sermon) => (
                        <Link key={sermon.id} href={`/sermons/${sermon.id}`} className="group cursor-pointer block">
                            <div className="relative aspect-video overflow-hidden mb-6 border border-zinc-200 p-4 flex flex-col justify-end group">
                                <Image
                                    src="/sermon.jpg"
                                    alt={sermon.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/20"></div>

                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="font-heading text-6xl text-white">{sermon.category.charAt(0)}</span>
                                </div>
                                <div className="border-4 border-primary/30 w-full h-full absolute inset-0 group-hover:border-primary transition-all duration-300"></div>

                                <h4 className="relative z-10 font-heading text-xl leading-none mb-1 group-hover:text-primary transition-colors text-white uppercase truncate">
                                    {sermon.title}
                                </h4>
                                <span className="relative z-10 text-[10px] tracking-[0.2em] text-white/80 uppercase">{sermon.category}</span>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-xl font-heading group-hover:text-primary transition-colors text-black">{sermon.title}</h3>
                                <div className="flex items-center gap-4 text-xs text-zinc-500 tracking-wider">
                                    <span className="font-bold">{sermon.preacher}</span>
                                    <span>•</span>
                                    <span>{new Date(sermon.createdAt).toLocaleDateString('fr-FR')}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
