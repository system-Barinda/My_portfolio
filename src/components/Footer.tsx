import { Mail, Download } from "lucide-react";
import { profile } from "../data/portfolio";
import { Section } from "../App";

export default function Footer({ onSelect }: { onSelect: (s: Section) => void }) {
  return (
    <footer className="flex min-h-14 shrink-0 items-center justify-between border-t border-black/10 bg-white px-5 py-3 md:px-8">
      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-wider text-black/45">
        <span>© {new Date().getFullYear()} System Sylvere Barinda</span>
      </div>
      <div className="hidden items-center gap-5 text-[10px] text-slate-900 font-bold uppercase tracking-wider md:flex">
        <button
          onClick={() => onSelect("about")}
          className="hover:text-blue-600"
        >
          About
        </button>
        <button
          onClick={() => onSelect("projects")}
          className="hover:text-blue-600"
        >
          Work
        </button>
        <button
          onClick={() => onSelect("contact")}
          className="hover:text-blue-600"
        >
          Contact
        </button>
        <a
          href={`mailto:${profile.email}`}
          className="flex items-center gap-1.5 hover:text-blue-600"
        >
          <Mail size={12} /> Email
        </a>
      </div>
      <a
        href="/cv.pdf"
        download
        className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider hover:text-blue-600"
      >
        <Download size={12} /> CV
      </a>
    </footer>
  );
}