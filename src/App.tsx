import { useEffect, useState, type ReactNode } from "react";
import { Menu } from "lucide-react";
import { isSection, nav, type Section } from "./navigation";
import { profile } from "./data/portfolio";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import SkillsPage from "./components/SkillsPage";
import ProjectsPage from "./components/ProjectsPage";
import ExperiencePage from "./components/ExperiencePage";
import CertificatesPage from "./components/CertificatesPage";
import ContactPage from "./components/ContactPage";

const sectionFromHash = (): Section => {
  const hash = window.location.hash.slice(1);
  return isSection(hash) ? hash : "home";
};

export default function App() {
  const [active, setActive] = useState<Section>(sectionFromHash);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onHashChange = () => setActive(sectionFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const select = (section: Section) => {
    setActive(section);
    setMobileMenu(false);
    window.history.replaceState(null, "", section === "home" ? window.location.pathname : `#${section}`);
  };

  const pages: Record<Section, ReactNode> = {
    home: <HomePage onSelect={select} />,
    about: <AboutPage />,
    skills: <SkillsPage />,
    projects: <ProjectsPage />,
    experience: <ExperiencePage />,
    certificates: <CertificatesPage />,
    contact: <ContactPage />,
  };

  const activeLabel = nav.find((n) => n.id === active)?.label ?? "";

  return (
    <div className="h-dvh bg-blue-600 text-slate-950 md:p-4">
      <div className="mx-auto flex h-full max-w-[1500px] overflow-hidden bg-white shadow-2xl md:rounded-2xl md:border md:border-black/10">
        <Sidebar active={active} onSelect={select} mobileOpen={mobileMenu} onClose={() => setMobileMenu(false)} />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5 md:h-20 md:px-8">
            <button
              type="button"
              onClick={() => setMobileMenu(true)}
              className="flex items-center gap-2 text-sm font-bold md:hidden"
              aria-label="Open menu"
            >
              <Menu size={21} /> Menu
            </button>
            <p className="hidden text-xs font-bold uppercase tracking-[0.22em] text-slate-500 md:block">
              {activeLabel}
            </p>
            <p className="flex items-center gap-3 text-xs font-semibold text-slate-500">
              <span className="hidden sm:inline">Based in {profile.location}</span>
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600 shadow-[0_0_0_5px_rgba(37,99,235,0.12)]" />
            </p>
          </header>

          <main key={active} className="min-h-0 flex-1 animate-[fade-in_.35s_ease-out] motion-reduce:animate-none">
            {pages[active]}
          </main>

          <Footer onSelect={select} />
        </div>
      </div>
    </div>
  );
}
