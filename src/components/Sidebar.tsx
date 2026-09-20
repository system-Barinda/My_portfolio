import { X, ChevronRight, Mail } from "lucide-react";
import { nav, Section } from "../App";
import { profile } from "../data/portfolio";

export default function Sidebar({
  active,
  onSelect,
  mobileOpen,
  onClose,
}: {
  active: Section;
  onSelect: (s: Section) => void;
  mobileOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[300px] border-r border-gray-600 bg-gray-300 text-black shadow-2xl transition-transform duration-300 md:relative md:flex md:w-[300px] md:translate-x-0 md:flex-col md:shadow-none ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-full flex-col p-6">
          <div className="mb-10 flex items-start justify-between">
            <button onClick={() => onSelect("home")} className="text-left">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-black">
                SB
              </div>
              <p className="text-lg font-black leading-tight">
                System Sylvere
                <br />
                Barinda
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900">
                Software Engineer
              </p>
            </button>
            <button
              onClick={onClose}
              className="md:hidden"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="space-y-1" aria-label="Portfolio navigation">
            {nav.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onSelect(id)}
                className={`group flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-bold transition ${active === id ? "bg-blue-600 text-white" : "text-slate-900 hover:bg-white/10 hover:text-blue-800"}`}
              >
                <span className="flex items-center gap-3">
                  <Icon size={17} /> {label}
                </span>
                <ChevronRight
                  size={15}
                  className={`${active === id ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`}
                />
              </button>
            ))}
          </nav>

          <div className="mt-auto space-y-4 border-t border-gray-600 pt-5">
            <div className="rounded-xl border border-gray-600 bg-white/5 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-700">
                Availability
              </p>
              <div className="mt-2 flex items-center gap-2 text-xs font-semibold">
                <span className="h-2 w-2 rounded-full bg-blue-500" /> Open to
                opportunities
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-gray-600 p-2.5 hover:bg-gray-600"
              ></a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-gray-800 rounded-lg border border-gray-600 p-2.5 hover:bg-gray-600"
              ></a>
              <a
                href={`mailto:${profile.email}`}
                className="text-gray-800 rounded-lg border border-gray-600 p-2.5 hover:bg-gray-600"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>
      </aside>
      {mobileOpen && (
        <button
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={onClose}
          aria-label="Close navigation overlay"
        />
      )}
    </>
  );
}