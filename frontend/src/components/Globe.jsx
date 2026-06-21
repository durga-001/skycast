// components/Globe.jsx
import { useRef, useEffect, useState } from "react";
import GlobeGL from "react-globe.gl";

export default function Globe({ onLocationSelect }) {
  const globeRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });

  useEffect(() => {
    const resize = () => {
      const width = Math.min(window.innerWidth - 32, 600);
      setDimensions({ width, height: width });
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.6;
      globeRef.current.controls().enableZoom = true;
      globeRef.current.pointOfView({ altitude: 2.2 });
    }
  }, []);

  const handleClick = ({ lat, lng }) => {
    onLocationSelect && onLocationSelect({ lat, lng });
  };

  return (
    <div className="flex justify-center items-center">
      <GlobeGL
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere={true}
        atmosphereColor="#22d3ee"
        atmosphereAltitude={0.25}
        onGlobeClick={handleClick}
      />
    </div>
  );
}
