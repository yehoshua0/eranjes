"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock, Tag, Calendar, User, Share2 } from "lucide-react";

export default function BlogDetailPage() {
    const params = useParams();
    const id = params.id;

    // Simulate database
    const posts = [
        {
            id: "1",
            title: "Comment nourrir sa foi quotidiennement",
            content: `
                <p>La vie moderne peut nous éloigner de l'essentiel. Dans le tumulte du quotidien, il est facile de perdre de vue notre connexion avec le divin. Pourtant, nourrir sa foi n'est pas une tâche monumentale réservée aux moments de crise, mais une série de petits pas quotidiens.</p>
                <br/>
                <h3 class="text-2xl font-heading text-black">1. La Prière Matinale</h3>
                <p>Commencer sa journée par la prière, c'est comme accorder un instrument avant de jouer une symphonie. C'est un moment de silence où nous remettons nos inquiétudes entre les mains de Dieu et recevons sa paix pour affronter les défis à venir.</p>
                <br/>
                <h3 class="text-2xl font-heading text-black">2. La Lecture Méditative</h3>
                <p>La Parole de Dieu est une nourriture. Prenez le temps de lire un passage, même court, et de le laisser résonner en vous tout au long de la journée. Posez-vous la question : "Qu'est-ce que ce texte dit à ma situation actuelle ?"</p>
                <br/>
                <h3 class="text-2xl font-heading text-black">3. La Gratitude</h3>
                <p>Apprendre à dire merci pour les "petites victoires" cultive un cœur joyeux. La gratitude nous permet de voir la main de Dieu là où nous ne voyions auparavant que du hasard.</p>
                <br/>
                <p>En intégrant ces habitudes, vous verrez votre foi passer d'un simple concept intellectuel à une réalité vivante et transformatrice.</p>
            `,
            date: "1 Mars 2024",
            readTime: "5 min",
            category: "Croissance",
            author: "Pasteur Jean",
            image: "/explorer.jpg"
        },
        {
            id: "2",
            title: "L'impact du service dans la communauté",
            content: `
                <p>Servir ne transforme pas seulement la vie des autres, mais surtout la nôtre. Chez ERANJES, nous croyons que la foi sans les œuvres est morte, et que le service est l'expression la plus pure de l'amour du Christ.</p>
                <br/>
                <p>Lorsque nous sortons de notre zone de confort pour aider notre prochain, nous découvrons des facettes de nous-mêmes que nous ignorions. Le service nous enseigne l'humilité, la patience et la compassion.</p>
                <br/>
                <h3 class="text-2xl font-heading text-black">Bâtir ensemble</h3>
                <p>La communauté se renforce lorsque chaque membre apporte sa pierre à l'édifice. Que ce soit par un sourire, une aide matérielle ou une oreille attentive, chaque geste compte dans le royaume de Dieu.</p>
            `,
            date: "20 Février 2024",
            readTime: "8 min",
            category: "Communauté",
            author: "Responsable Social",
            image: "/explorer.jpg"
        },
        {
            id: "3",
            title: "La jeunesse face aux défis du 21e siècle",
            content: `
                <p>Être jeune et chrétien aujourd'hui demande du courage et du discernement. Entre les réseaux sociaux, les pressions sociales et les crises de valeurs, la nouvelle génération se trouve à la croisée des chemins.</p>
                <br/>
                <p>Il ne s'agit pas de s'isoler du monde, mais d'y briller. Nous encourageons nos jeunes à être des leaders d'opinion basés sur des principes bibliques solides.</p>
                <br/>
                <h3 class="text-2xl font-heading text-black">L'Identité en Christ</h3>
                <p>La clé pour surmonter les défis du siècle est de savoir qui nous sommes en Dieu. Une identité solide permet de ne pas vaciller face aux modes passagères.</p>
            `,
            date: "10 Février 2024",
            readTime: "12 min",
            category: "Jeunesse",
            author: "Leader Jeune",
            image: "/explorer.jpg"
        }
    ];

    const post = posts.find(p => p.id === id) || posts[0];

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
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} className="text-primary" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative w-full aspect-video md:aspect-[21/9] mt-12 overflow-hidden border border-zinc-100">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Post Content */}
                    <div className="max-w-3xl mx-auto py-20">
                        <div
                            className="text-lg text-zinc-600 leading-relaxed space-y-6 blog-content"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Tags & Share */}
                        <div className="mt-20 pt-12 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="flex items-center gap-4">
                                <Tag size={20} className="text-primary" />
                                <div className="flex gap-2">
                                    <span className="px-3 py-1 bg-zinc-50 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Foi</span>
                                    <span className="px-3 py-1 bg-zinc-50 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Vie</span>
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
