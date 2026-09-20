import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Code2,
  Download,
  GraduationCap,
  Home,
  Mail,
  Menu,
  Sparkles,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import {
  profile,

} from "./data/portfolio";
import ProjectsPage from "./components/ProjectsPage";
import ExperiencePage from "./components/ExperiencePage";
import SkillsPage from "./components/SkillsPage";
import ContactPage from "./components/ContactPage";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";

export type Section =
  | "home"
  | "about"
  | "projects"
  | "experience"
  | "skills"
  | "contact";

export const nav: { id: Section; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Overview", icon: Home },
  { id: "about", label: "About me", icon: UserRound },
  { id: "projects", label: "Projects", icon: Code2 },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "skills", label: "Skills", icon: Zap },
  { id: "contact", label: "Contact", icon: Mail },
];

function App() {
  const [active, setActive] = useState<Section>("home");
  const [mobileMenu, setMobileMenu] = useState(false);

  const select = (section: Section) => {
    setActive(section);
    setMobileMenu(false);
  };

  return (
    <main className="h-full min-h-screen bg-blue-600 text-black md:p-4">
      <div className="mx-auto flex h-full max-w-[1500px] flex-col overflow-hidden bg-white shadow-2xl md:flex-row md:rounded-2xl md:border md:border-black/10">
        <Sidebar
          active={active}
          onSelect={select}
          mobileOpen={mobileMenu}
          onClose={() => setMobileMenu(false)}
        />

        <section className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-black/10 bg-white px-5 md:h-20 md:px-8">
            <button
              onClick={() => setMobileMenu(true)}
              className="flex items-center gap-2 text-sm font-bold md:hidden"
              aria-label="Open menu"
            >
              <Menu size={21} /> Menu
            </button>
            <div className="hidden text-xs font-bold uppercase tracking-[0.22em] text-black/45 md:block">
              {String(active).replace("-", " ")}
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden text-xs font-semibold text-black/50 sm:block">
                Based in Rwanda
              </span>
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600 shadow-[0_0_0_5px_rgba(37,99,235,0.12)]" />
            </div>
          </header>

          <div className="min-h-0 flex-1 overflow-hidden">
            <Content active={active} onSelect={select} />
          </div>

          <Footer onSelect={select} />
        </section>
      </div>
    </main>
  );
}

<Sidebar active={"projects"} onSelect={function (s: Section): void {
  throw new Error("Function not implemented.");
} } mobileOpen={false} onClose={function (): void {
  throw new Error("Function not implemented.");
} } />

function Content({
  active,
  onSelect,
}: {
  active: Section;
  onSelect: (s: Section) => void;
}) {
  const pages: Record<Section, ReactNode> = {
    home: <HomePage onSelect={onSelect} />,
    about: <AboutPage />,
    projects: <ProjectsPage />,
    experience: <ExperiencePage />,
    skills: <SkillsPage />,
    contact: <ContactPage />,
  };
  return <div className="h-full overflow-hidden">{pages[active]}</div>;
}

export function Page({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="h-full overflow-y-auto px-5 py-7 md:overflow-hidden md:px-10 md:py-9">
      <div className="mx-auto flex h-full max-w-5xl flex-col">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-600">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">
          {title}
        </h1>
        <div className="mt-7 min-h-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

<HomePage onSelect={function (s: Section): void {
  throw new Error("Function not implemented.");
} } />
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <p className="text-4xl font-black">{value}</p>
      <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-black/45">
        {label}
      </p>
    </div>
  );
}





<AboutPage />
export function Info({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl bg-black/3 p-4">
      <div className="flex items-center gap-2 text-blue-600">
        {icon}
        <span className="text-xs font-black uppercase tracking-wider">
          {title}
        </span>
      </div>
      <p className="mt-2 text-sm font-bold">{text}</p>
    </div>
  );
}

<><ProjectsPage /><ExperiencePage /><SkillsPage /><ContactPage /></>



function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="mb-4 block">
      <span className="mb-2 block text-xs font-black uppercase tracking-wider">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
      />
    </label>
  );
}

<Footer onSelect={function (s: Section): void {
  throw new Error("Function not implemented.");
} } />

export default App;
