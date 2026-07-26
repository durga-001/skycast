import Hero from "../components/Hero";
import Features from "../components/Features";
import MapSection from "../components/MapSection";

export default function Home() {
  return (
    <main className="home">
      <Hero />
      <div id="map">
        <MapSection />
      </div>
      <Features />
    </main>
  );
}
