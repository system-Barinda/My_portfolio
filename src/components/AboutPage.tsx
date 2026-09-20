import { GraduationCap, Code2, CheckCircle2, Info } from "lucide-react";
import { Page } from "../App";
import { profile } from "../data/portfolio";
import { useState, useEffect, type ReactNode } from "react";

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
          {icon}
        </div>
        <span className="text-sm font-bold uppercase tracking-[0.12em] text-black/65">
          {title}
        </span>
      </div>
      <p className="mt-3 text-sm leading-7 text-black/70">{text}</p>
    </div>
  );
}

function ProfileImageSlider() {
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
    <div className="mt-6 overflow-hidden rounded-2xl border border-black/10 shadow-sm">
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

export default function AboutPage() {
  return (
    <Page eyebrow="01 / About" title="A developer who keeps learning.">
      <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <div className="rounded-2xl border border-black/10 p-6 shadow-sm md:p-8">
          <p className="text-base leading-8 text-black/65"> My journey into software engineering started with software development studies at <strong className="text-black">TSS-Mutovu</strong>, where I discovered my passion for technology and learned the fundamentals of building software. I continued developing my knowledge through Information Technology at <strong className="text-black">RP-Tumba College</strong>, where I strengthened my technical foundation through practical learning and hands-on projects. </p>
          <p className="mt-5 text-base leading-8 text-black/65"> I also had the opportunity to train in software engineering through <strong className="text-black"> TheGym Rwanda</strong>. This experience helped me move beyond learning concepts and develop a real engineering mindset. I learned how to design and build reliable <strong className="text-black"> backend and frontend applications</strong>, create APIs, work with databases, implement authentication and authorization, write automated tests, and structure applications using clean and maintainable code. </p>
          <p className="mt-5 text-base leading-8 text-black/65">
           I enjoy transforming real-world problems into well-designed software. I believe good engineering is not only about writing code it is about understanding the problem, creating simple solutions, building with quality, and continuously improving the final product.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <Info
              icon={<GraduationCap size={18} />}
              title="Education"
              text={profile.education}
            />
            <Info
              icon={<Code2 size={18} />}
              title="Focus"
              text="Backend + full-stack"
            />
          </div>
        </div>
       <div className="space-y-6">

  {/* What I Bring */}
  <div className="rounded-2xl bg-blue-600 p-6 text-white md:p-8">
    <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-300">
      What I bring
    </p>

    <div className="mt-7 space-y-5">
      {[
        "Curiosity and continuous learning",
        "Team communication and ownership",
        "Clean, testable implementation",
        "Problem solving with a user mindset",
      ].map((x) => (
        <div
          key={x}
          className="flex gap-3 text-sm font-semibold"
        >
          <CheckCircle2
            className="shrink-0 text-blue-900"
            size={18}
          />

          <span>{x}</span>
        
        </div>

      ))}
    
    </div>
  </div>
  

  {/* Automatic Profile Image Slider */}
  <ProfileImageSlider />

</div>
      </div>
    </Page>
  );
}