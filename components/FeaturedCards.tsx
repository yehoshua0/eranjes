import Image from "next/image";
import Link from "next/link";


export default function FeaturedCards() {
    const cards = [
        { title: "BLOGS", color: "bg-zinc-800" },
        { title: "ÉVÉNEMENTS", color: "bg-zinc-900" },
        { title: "YOUTUBE", color: "bg-black" },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center mb-16">
                    <div className="w-20 h-1 bg-primary mb-4"></div>
                    <h2 className="text-4xl md:text-5xl font-heading text-black">Explorer</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cards.map((card) => {
                        const href = `/${card.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`;
                        return (
                            <Link
                                key={card.title}
                                href={href === "/youtube" ? "https://youtube.com" : href}
                                target={href === "/youtube" ? "_blank" : "_self"}
                                className="relative aspect-[3/4] group cursor-pointer overflow-hidden rounded-sm flex items-center justify-center border border-zinc-200"
                            >
                                <Image
                                    src="/explorer.jpg"
                                    alt={card.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                {/* Decorative border */}
                                <div className="absolute inset-6 border border-primary/40 group-hover:inset-4 group-hover:border-primary transition-all duration-500"></div>

                                <h3 className="relative z-10 text-4xl md:text-5xl font-heading text-black group-hover:scale-110 transition-transform duration-500 tracking-wider">
                                    {card.title.charAt(0) + card.title.slice(1).toLowerCase()}
                                </h3>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>

    );
}
