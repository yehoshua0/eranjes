"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBg = isHomePage
    ? (isScrolled ? "bg-white/95 py-2 shadow-sm border-b border-zinc-100" : "bg-transparent py-4")
    : "bg-white py-2 shadow-sm border-b border-zinc-100";

  const textColor = isHomePage
    ? (isScrolled ? "text-zinc-700 hover:text-black" : "text-white hover:text-primary")
    : "text-zinc-700 hover:text-black";

  const logoColor = isHomePage
    ? (isScrolled ? "text-black" : "text-white")
    : "text-black";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navBg}`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="ERANJES Logo"
            width={50}
            height={50}
            className="w-10 h-10 object-contain rounded"
          />
          <div className="flex flex-col leading-none">
            <span className={`font-heading text-xl transition-colors ${logoColor}`}>ERANJES</span>
            {/* <span className="text-[10px] text-primary tracking-widest font-bold">Église Réveillée</span> */}
          </div>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Accueil", "Sermons", "Blogs", "Événements", "Contact"].map((item) => {
            let href = "/";
            if (item === "Sermons") href = "/sermons";
            else if (item === "Blogs") href = "/blogs";
            else if (item === "Événements") href = "/evenements";
            else if (item === "Contact") href = "/#contact";

            return (
              <Link
                key={item}
                href={href}
                className={`transition-colors text-sm font-semibold tracking-wide ${textColor}`}
              >
                {item}
              </Link>
            );
          })}
        </div>

        {/* Give Button */}
        <button className="bg-primary text-primary-foreground px-6 py-2 rounded-sm font-heading text-sm hover:bg-yellow-400 transition-all active:scale-95">
          Faire un don
        </button>
      </div>
    </nav>
  );
}
