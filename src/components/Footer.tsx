import { Download } from "lucide-react";
import { profile } from "../data/portfolio";
import type { Section } from "../navigation";

const links: { id: Section; label: string }[] = [
  { id: "about", label: "About" },
  { id: "projects", label: "Work" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

export default function Footer({ onSelect }: { onSelect: (s: Section) => void }) {
  return (
    <footer className="flex min-h-14 shrink-0 items-center justify-between gap-4 border-t border-slate-200 bg-white px-5 py-3 text-[11px] font-bold uppercase tracking-wider md:px-8">
      <span className="text-slate-500">
        © {new Date().getFullYear()} {profile.name}
      </span>
      <div className="hidden items-center gap-5 text-slate-700 md:flex">
        {links.map((l) => (
          <button key={l.id} type="button" onClick={() => onSelect(l.id)} className="uppercase hover:text-blue-600">
            {l.label}
          </button>
        ))}
      </div>
      <a href={profile.cvUrl} download={profile.cvFileName} className="flex items-center gap-1.5 text-slate-900 hover:text-blue-600">
        <Download size={12} aria-hidden="true" /> CV
      </a>
    </footer>
  );
}
