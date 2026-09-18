import { useState, useEffect } from "react";

export function ContactImage() {
  const images = [
    "/images/barinda_1.jpeg",
    "/images/barinda.jpeg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((previous) => (previous + 1) % images.length);
    }, 500000); // Changes every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-black/10  shadow-sm">
      <div className="relative aspect-[16/9] w-full">
        {images.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`System Sylvere Barinda profile ${index + 1}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              currentImage === index
                ? "opacity-100"
                : "opacity-0"
            }`}
          />
        ))}

        {/* Small slide indicators */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, index) => (
            <span
              key={index}
              className={`h-2 rounded-full transition-all duration-500 ${
                currentImage === index
                  ? "w-6 bg-blue-500"
                  : "w-2 bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
