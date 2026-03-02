import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Background with user illustration */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/banner.jpg"
          alt="ERANJES Church Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0"></div>
        <div className="absolute inset-0"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-7xl lg:text-8xl text-white mb-4 animate-fade-in-up">
          Bienvenue à l'église <span className="text-primary italic">ERANJES</span>
        </h1>
        <p className="text-lg md:text-xl text-white mb-10 max-w-2xl mx-auto font-body tracking-wide animate-fade-in-up delay-100">
          Église Réveillée Au Nom de Jésus. Unir les cœurs, transformer des vies et bâtir ensemble un avenir de foi.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-200">
          <Link
            href="#join"
            className="bg-primary text-primary-foreground px-10 py-4 font-heading text-lg hover:bg-yellow-400 transition-all hover:scale-105 active:scale-95 rounded-sm"
          >
            Nous rejoindre
          </Link>
          <button className="border border-zinc-200 text-white px-10 py-4 font-heading text-lg hover:bg-zinc-50 transition-all rounded-sm">
            Voir les sermons
          </button>
        </div>
      </div>

    </section>
  );
}
