import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { MapPin, Calendar, Clock, Ticket } from "lucide-react";

export default function EventsPage() {
    const events = [
        {
            id: 1,
            title: "Célébration du Dimanche des Rameaux",
            date: "24 Mars 2024",
            time: "09:00 - 12:00",
            location: "Auditorium Principal, Lomé",
            category: "Service Spécial",
            featured: true
        },
        {
            id: 2,
            title: "Séminaire : Bâtir son Foyer sur le Roc",
            date: "10 Avril 2024",
            time: "18:00 - 20:30",
            location: "Salle des Fêtes ERANJES",
            category: "Famille",
            featured: false
        },
        {
            id: 3,
            title: "Rassemblement des Jeunes : IMPACT 2024",
            date: "15 Mai 2024",
            time: "14:00 - 18:00",
            location: "Stade Municipal, Lomé",
            category: "Jeunesse",
            featured: false
        }
    ];

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Header with Background */}
            <div className="pt-40 pb-24 bg-zinc-50 border-b border-zinc-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2"></div>
                <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-end gap-12">
                    <div className="max-w-2xl">
                        <div className="w-20 h-1 bg-primary mb-4"></div>
                        <h1 className="text-5xl md:text-8xl text-black mb-6">Événements</h1>
                        <p className="text-zinc-600 text-xl font-medium tracking-wide">
                            Des moments de communion, d'apprentissage et de célébration au cœur de notre église.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-center p-6 border-l-2 border-primary bg-white shadow-sm">
                            <span className="block text-4xl font-heading text-black">12+</span>
                            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Événements prévus</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Event List */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col gap-12">
                        {events.map((event) => (
                            <div key={event.id} className={`grid grid-cols-1 lg:grid-cols-12 gap-0 border border-zinc-100 group transition-all duration-500 ${event.featured ? 'border-primary' : 'hover:border-primary'}`}>
                                {/* Date Column */}
                                <div className={`lg:col-span-2 flex flex-col items-center justify-center p-8 text-center border-b lg:border-b-0 lg:border-r border-zinc-100 ${event.featured ? 'bg-primary text-black' : 'bg-black text-white group-hover:bg-primary group-hover:text-black transition-colors'}`}>
                                    <span className="text-4xl font-heading leading-none">{event.date.split(" ")[0]}</span>
                                    <span className="text-sm font-bold uppercase tracking-[0.2em]">{event.date.split(" ")[1]}</span>
                                    <span className="text-xs opacity-60 mt-2">{event.date.split(" ")[2]}</span>
                                </div>

                                {/* Info Column */}
                                <div className="lg:col-span-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12 items-center bg-white">
                                    <div className="space-y-4">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">{event.category}</span>
                                        <h2 className="text-3xl font-heading text-black leading-tight cursor-pointer hover:text-primary transition-all">
                                            {event.title}
                                        </h2>
                                        <div className="flex flex-col gap-3 text-sm text-zinc-500 font-medium">
                                            <div className="flex items-center gap-3">
                                                <Clock size={16} className="text-primary" />
                                                <span>{event.time}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <MapPin size={16} className="text-primary" />
                                                <span>{event.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex md:justify-end gap-4">
                                        <button className="flex items-center gap-3 bg-black text-white px-8 py-4 font-bold uppercase text-[10px] tracking-widest hover:bg-primary hover:text-black transition-all">
                                            <Ticket size={20} />
                                            Réserver
                                        </button>
                                        <button className="px-8 py-4 border border-zinc-200 font-bold uppercase text-[10px] tracking-widest hover:bg-zinc-50 transition-all">
                                            Détails
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        <button className="bg-zinc-900 text-white px-12 py-5 font-bold uppercase text-[10px] tracking-[0.4em] hover:bg-primary hover:text-black transition-all shadow-md">
                            Voir le calendrier complet
                        </button>
                    </div>
                </div>
            </section>

            {/* Newsletter Call to Action */}
            <div className="bg-black py-20 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10 text-center space-y-8">
                    <h3 className="text-3xl md:text-5xl font-heading text-white">
                        Ne manquez jamais un <span className="text-primary italic underline decoration-2 underline-offset-8">rassemblement</span>
                    </h3>
                    <p className="text-zinc-400 max-w-xl mx-auto">
                        Inscrivez-vous pour recevoir des notifications périodiques sur nos événements et festivités.
                    </p>
                    <div className="flex justify-center flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input type="email" placeholder="Email" className="bg-white/10 px-6 py-4 outline-none text-white border border-white/20 flex-grow" />
                        <button className="bg-primary text-black px-8 py-4 font-bold uppercase text-xs tracking-widest">S'inscrire</button>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
