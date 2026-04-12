import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";

import { getBlogs } from "@/app/actions";

export default async function BlogsPage() {
    const posts = await getBlogs();

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Minimalist Header */}
            <div className="pt-40 pb-20 border-b border-zinc-100">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl">
                        <div className="w-20 h-1 bg-primary mb-4"></div>
                        <h1 className="text-5xl md:text-7xl text-black mb-6 italic">Le Blog</h1>
                        <p className="text-zinc-600 text-xl leading-relaxed">
                            Pensées, témoignages et enseignements pour éclairer votre parcours spirituel au quotidien.
                        </p>
                    </div>
                </div>
            </div>

            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 gap-24">
                        {posts.map((post) => (
                            <article key={post.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group">
                                <Link href={`/blogs/${post.id}`} className="relative aspect-[16/9] overflow-hidden border border-zinc-100 block">
                                    <Image
                                        src={post.cover || "/explorer.jpg"}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute top-6 left-6">
                                        <span className="bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-black shadow-sm">
                                            {post.category}
                                        </span>
                                    </div>
                                </Link>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-6 text-xs text-zinc-500 font-bold uppercase tracking-[0.2em]">
                                        <div className="flex items-center gap-2">
                                            <Tag size={14} className="text-primary" />
                                            <span>{post.author}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} className="text-primary" />
                                            <span>{new Date(post.createdAt).toLocaleDateString('fr-FR')}</span>
                                        </div>
                                    </div>
                                    <Link href={`/blogs/${post.id}`}>
                                        <h2 className="text-3xl md:text-5xl font-heading text-black leading-tight group-hover:text-primary transition-colors cursor-pointer">
                                            {post.title}
                                        </h2>
                                    </Link>
                                    <p className="text-zinc-600 text-lg leading-relaxed max-w-xl line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <Link href={`/blogs/${post.id}`} className="inline-flex items-center gap-3 text-black font-bold uppercase tracking-widest text-sm group-hover:gap-5 transition-all">
                                        Lire l'article <ArrowRight size={20} className="text-primary" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Newsletter Call to Action */}
                    <div className="mt-32 p-12 md:p-20 bg-zinc-50 border border-zinc-100 text-center relative overflow-hidden">
                        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                            <h3 className="text-3xl md:text-4xl font-heading text-black">
                                Recevez nos derniers articles directement
                                <span className="block text-primary italic">dans votre boîte mail</span>
                            </h3>
                            <div className="flex flex-col sm:flex-row gap-0 overflow-hidden rounded-sm border border-zinc-200">
                                <input
                                    type="email"
                                    placeholder="Votre adresse email"
                                    className="bg-white px-6 py-4 flex-grow outline-none text-black"
                                />
                                <button className="bg-black text-white px-10 py-4 font-bold uppercase text-xs tracking-[0.2em] hover:bg-primary hover:text-black transition-all">
                                    S'inscrire
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
