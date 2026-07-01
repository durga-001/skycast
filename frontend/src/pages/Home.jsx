import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Globe from "../components/Globe";
import Features from "../components/Features";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <Navbar />

      <Hero />

      {/* <section id="globe" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <Globe />
        </div>
      </section> */}

      <Features />

      <Footer />
    </div>
  );
}
