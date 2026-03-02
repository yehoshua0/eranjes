import Link from "next/link";
import { MessageCircle } from "lucide-react";


export default function Footer() {
    return (
        <footer className="bg-zinc-50 text-black py-20 border-t border-zinc-200">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            <h4 className="font-heading text-primary tracking-wider">Navigation</h4>
                            <nav className="flex flex-col gap-2 text-sm text-zinc-600">
                                <Link href="/" className="hover:text-black transition-colors font-medium">Accueil</Link>
                                <Link href="/sermons" className="hover:text-black transition-colors font-medium">Sermons</Link>
                                <Link href="/blogs" className="hover:text-black transition-colors font-medium">Blogs</Link>
                                <Link href="/evenements" className="hover:text-black transition-colors font-medium">Événements</Link>
                                <Link href="/#contact" className="hover:text-black transition-colors font-medium">À Propos</Link>
                            </nav>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-heading text-primary tracking-wider">Contact</h4>
                            <div className="flex flex-col gap-2 text-sm text-zinc-600 font-medium">
                                <p>Lomé, TOGO</p>
                                <p>+228 92 41 62 50</p>
                                <p>contact@eranjes.org</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-heading text-2xl tracking-tighter italic text-black">
                            Abonnez-vous à notre <span className="text-primary underline decoration-2 underline-offset-4">newsletter!</span>
                        </h4>
                        <div className="flex flex-col sm:flex-row gap-0 overflow-hidden rounded-sm border border-zinc-200 max-w-md">

                            <input
                                type="email"
                                placeholder="Votre E-mail"
                                className="bg-white px-6 py-4 flex-grow focus:outline-none text-black text-sm"
                            />
                            <button className="bg-primary text-primary-foreground px-8 py-4 font-heading hover:bg-yellow-400 transition-colors text-sm font-bold">
                                S'abonner
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-200 gap-6">
                    <p className="text-xs text-zinc-500 tracking-widest font-bold">
                        © {new Date().getFullYear()} ERANJES. Tous droits réservés.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="#" className="p-2.5 bg-white border border-zinc-200 rounded-full text-zinc-600 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300 flex items-center gap-2 px-4 rounded-sm">
                            <MessageCircle size={18} />
                            <span className="text-xs font-bold uppercase tracking-widest">WhatsApp</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
