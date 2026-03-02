import Image from "next/image";

export default function AboutUs() {
    return (
        <section id="à propos" className="py-24 bg-white overflow-hidden text-black">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center mb-16">
                    <div className="w-20 h-1 bg-primary mb-4"></div>
                    <h2 className="text-4xl md:text-5xl font-heading text-black">À propos de nous</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative group">
                        <div className="relative aspect-video rounded-lg overflow-hidden border border-zinc-200">


                            <Image
                                src="/about.jpg"
                                alt="ERANJES Notre Histoire"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-heading text-primary">Notre Histoire</h3>
                        <p className="text-lg text-zinc-600 leading-relaxed">
                            Bienvenue à l'Église Réveillée Au Nom de Jésus (ERANJES). Notre mission est de proclamer l'Évangile,
                            de transformer les cœurs et de bâtir une communauté forte ancrée dans la foi et l'amour du Christ.
                        </p>
                        <p className="text-lg text-zinc-600 leading-relaxed">
                            Depuis notre fondation, nous nous efforçons d'être un phare d'espoir et de vérité pour tous ceux qui cherchent
                            un sens profond à leur vie à travers la présence de Dieu.
                        </p>
                        <button className="bg-primary text-primary-foreground px-8 py-3 font-heading hover:bg-yellow-400 transition-all rounded-sm tracking-wide">
                            En savoir plus
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
