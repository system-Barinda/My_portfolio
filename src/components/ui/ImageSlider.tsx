import { useEffect, useState } from "react";

type ImageSliderProps = {
  images: string[];
  alt: string;
  intervalMs?: number;
  className?: string;
};

export default function ImageSlider({
  images,
  alt,
  intervalMs = 5000,
  className = "",
}: ImageSliderProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;
    const id = window.setInterval(
      () => setCurrent((prev) => (prev + 1) % images.length),
      intervalMs,
    );
    return () => window.clearInterval(id);
  }, [images.length, intervalMs]);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm ${className}`}
    >
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`${alt} ${index + 1}`}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            current === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Show image ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-500 ${
                current === index ? "w-6 bg-blue-600" : "w-2 bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
