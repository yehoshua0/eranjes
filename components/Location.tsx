import { Mail, Phone, MapPin } from "lucide-react";

export default function Location() {
    return (
        <section id="contact" className="py-24 bg-zinc-50">

            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center mb-16 text-center">
                    <div className="w-20 h-1 bg-primary mb-4"></div>
                    <h2 className="text-4xl md:text-5xl font-heading text-black">Localisation</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-12">
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-sm shrink-0">
                                <Mail className="text-primary-foreground w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-heading text-xl text-black">E-mail</h4>
                                <p className="text-zinc-600">contact@eranjes.org</p>
                            </div>
                        </div>

                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-sm shrink-0">
                                <Phone className="text-primary-foreground w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-heading text-xl text-black">Téléphone</h4>
                                <p className="text-zinc-600">+228 92 41 62 50</p>
                            </div>
                        </div>

                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-sm shrink-0">
                                <MapPin className="text-primary-foreground w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-heading text-xl text-black">Adresse</h4>
                                <p className="text-zinc-600">Lomé, TOGO</p>
                            </div>
                        </div>
                    </div>

                    <div className="aspect-square lg:aspect-video bg-zinc-100 rounded-sm overflow-hidden border border-zinc-200">
                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight={0}
                            marginWidth={0}
                            src="https://www.openstreetmap.org/export/embed.html?bbox=1.21%2C6.15%2C1.24%2C6.19&amp;layer=mapnik&amp;marker=6.1705%2C1.2228"

                            className="grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity duration-500"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}
