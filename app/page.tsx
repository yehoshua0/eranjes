import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Sermons from "@/components/Sermons";
import FeaturedCards from "@/components/FeaturedCards";
import Location from "@/components/Location";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-body selection:bg-primary selection:text-primary-foreground text-black">
      <Navbar />
      <main>
        <Hero />
        <AboutUs />
        <Sermons />
        <FeaturedCards />
        <Location />
      </main>
      <Footer />
    </div>
  );
}
