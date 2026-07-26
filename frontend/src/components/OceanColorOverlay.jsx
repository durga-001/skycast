import { useEffect, useMemo, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

// Same color language as OceanMapLegend.jsx, but expressed as continuous
// gradient stops so the overlay blends smoothly instead of showing hard
// per-cell edges.
const COLOR_STOPS = {
  wave: [
    [0, [34, 197, 94]], // calm - green
    [0.25, [250, 204, 21]], // moderate - yellow
    [0.5, [249, 115, 22]], // rough - orange
    [0.75, [239, 68, 68]], // very rough - red
    [1, [127, 29, 29]], // high - dark red
  ],
  wind: [
    [0, [134, 239, 172]],
    [0.5, [34, 197, 94]],
    [1, [21, 128, 61]],
  ],
  period: [
    [0, [56, 189, 248]],
    [0.5, [14, 165, 233]],
    [1, [3, 105, 161]],
  ],
  swell: [
    [0, [167, 139, 250]],
    [0.5, [124, 58, 237]],
    [1, [76, 29, 149]],
  ],
};

const MAX_RANGES = { wave: 8, wind: 16, period: 14, swell: 4 };

// Deterministic pseudo-random noise, kept in sync with LargeOceanMap.jsx so
// the fake data looks the same everywhere it is used.
function noise(lat, lon, seed) {
  const n = Math.sin(lat * 12.9898 + lon * 78.233 + seed * 37.719) * 43758.5453;
  return n - Math.floor(n);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function sampleColor(stops, t) {
  const clamped = Math.max(0, Math.min(1, t));

  for (let i = 0; i < stops.length - 1; i++) {
    const [p0, c0] = stops[i];
    const [p1, c1] = stops[i + 1];

    if (clamped >= p0 && clamped <= p1) {
      const local = (clamped - p0) / (p1 - p0 || 1);

      return [
        Math.round(lerp(c0[0], c1[0], local)),
        Math.round(lerp(c0[1], c1[1], local)),
        Math.round(lerp(c0[2], c1[2], local)),
      ];
    }
  }

  return stops[stops.length - 1][1];
}

// Coarse grid of noise values across the whole globe, used as control
// points for smooth bilinear interpolation (this is what removes the hard
// "circle" edges and gives a continuous blob-like field instead).
function buildNodeGrid(selectedLayer, step = 15) {
  const seed = selectedLayer.length;

  const lats = [];
  for (let lat = -90; lat <= 90; lat += step) lats.push(lat);

  const lons = [];
  for (let lon = -180; lon <= 180; lon += step) lons.push(lon);

  const grid = lats.map((lat) => lons.map((lon) => noise(lat, lon, seed)));

  return { lats, lons, grid };
}

function bilinearSample(grid, lats, lons, lat, lon) {
  const clampedLat = Math.max(lats[0], Math.min(lats[lats.length - 1], lat));
  const clampedLon = Math.max(lons[0], Math.min(lons[lons.length - 1], lon));

  const stepLat = lats[1] - lats[0];
  const stepLon = lons[1] - lons[0];

  const i = Math.min(
    lats.length - 2,
    Math.floor((clampedLat - lats[0]) / stepLat),
  );
  const j = Math.min(
    lons.length - 2,
    Math.floor((clampedLon - lons[0]) / stepLon),
  );

  const tLat = (clampedLat - lats[i]) / stepLat;
  const tLon = (clampedLon - lons[j]) / stepLon;

  const v00 = grid[i][j];
  const v01 = grid[i][j + 1];
  const v10 = grid[i + 1][j];
  const v11 = grid[i + 1][j + 1];

  const top = lerp(v00, v01, tLon);
  const bottom = lerp(v10, v11, tLon);

  return lerp(top, bottom, tLat);
}

function OceanColorOverlay({ selectedLayer, opacity = 0.6 }) {
  const map = useMap();
  const overlayRef = useRef(null);

  const { lats, lons, grid } = useMemo(
    () => buildNodeGrid(selectedLayer),
    [selectedLayer],
  );

  useEffect(() => {
    const width = 720;
    const height = 360;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(width, height);

    const stops = COLOR_STOPS[selectedLayer] || COLOR_STOPS.wave;
    const maxRange = MAX_RANGES[selectedLayer] || 8;

    for (let y = 0; y < height; y++) {
      const lat = 90 - (y / (height - 1)) * 180;

      for (let x = 0; x < width; x++) {
        const lon = (x / (width - 1)) * 360 - 180;

        const raw = bilinearSample(grid, lats, lons, lat, lon);
        const [r, g, b] = sampleColor(stops, raw);

        const idx = (y * width + x) * 4;
        imageData.data[idx] = r;
        imageData.data[idx + 1] = g;
        imageData.data[idx + 2] = b;
        imageData.data[idx + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);

    // Extra feathering so the field looks soft and continuous, matching
    // the look of the real temperature tile layer used on land.
    const blurred = document.createElement("canvas");
    blurred.width = width;
    blurred.height = height;

    const blurredCtx = blurred.getContext("2d");
    blurredCtx.filter = "blur(6px)";
    blurredCtx.drawImage(canvas, 0, 0);

    const dataUrl = blurred.toDataURL();

    const bounds = [
      [-90, -180],
      [90, 180],
    ];

    if (overlayRef.current) {
      map.removeLayer(overlayRef.current);
    }

    const overlay = L.imageOverlay(dataUrl, bounds, {
      opacity,
      interactive: false,
    });

    overlay.addTo(map);
    overlayRef.current = overlay;

    return () => {
      if (overlayRef.current) {
        map.removeLayer(overlayRef.current);
        overlayRef.current = null;
      }
    };
  }, [map, selectedLayer, grid, lats, lons, opacity]);

  return null;
}

export default OceanColorOverlay;
