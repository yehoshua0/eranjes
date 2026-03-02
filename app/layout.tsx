import type { Metadata } from "next";
import { Anton, Roboto } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "ERANJES | Église Réveillée Au Nom de Jésus",
  description: "Bienvenue à l'église ERANJES à Lomé. Unir les cœurs, transformer des vies et bâtir ensemble un avenir de foi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${anton.variable} ${roboto.variable}`}>
      <body className="antialiased font-body">
        {children}
      </body>
    </html>
  );
}
