import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Tag, Calendar, User, Share2 } from "lucide-react";

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const post = await prisma.blog.findUnique({
        where: { id }
    });

    if (!post) {
        notFound();
    }

    // Dynamic increment of views
    await prisma.blog.update({
        where: { id },
        data: { views: { increment: 1 } }
    });

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Post Header */}
            <article className="pt-40">
                <div className="container mx-auto px-6">
                    <Link href="/blogs" className="inline-flex items-center gap-2 text-zinc-500 hover:text-black transition-colors mb-12 font-bold uppercase text-xs tracking-widest">
                        <ArrowLeft size={16} /> Retour au blog
                    </Link>

                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="flex items-center gap-4">
                            <span className="bg-primary px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
                                {post.category}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-heading text-black leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-8 py-8 border-y border-zinc-100 text-xs text-zinc-500 font-bold uppercase tracking-[0.2em]">
                            <div className="flex items-center gap-2">
                                <User size={16} className="text-primary" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-primary" />
                                <span>{new Date(post.createdAt).toLocaleDateString('fr-FR')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} className="text-primary" />
                                <span>{post.views} vues</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative w-full aspect-video md:aspect-[21/9] mt-12 overflow-hidden border border-zinc-100">
                        <Image
                            src={post.cover || "/explorer.jpg"}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Post Content */}
                    <div className="max-w-3xl mx-auto py-20">
                        <div
                            className="text-lg text-zinc-600 leading-relaxed space-y-6 blog-content whitespace-pre-wrap"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Tags & Share */}
                        <div className="mt-20 pt-12 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="flex items-center gap-4">
                                <Tag size={20} className="text-primary" />
                                <div className="flex gap-2">
                                    <span className="px-3 py-1 bg-zinc-50 text-[10px] font-bold uppercase tracking-widest text-zinc-500">{post.category}</span>
                                </div>
                            </div>
                            <button className="flex items-center gap-3 px-6 py-3 border border-zinc-200 hover:bg-zinc-50 transition-all font-bold uppercase text-xs tracking-widest">
                                <Share2 size={18} /> Partager l'article
                            </button>
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
