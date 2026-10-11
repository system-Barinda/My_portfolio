import { ChevronRight, X } from "lucide-react";
import { nav, type Section } from "../navigation";
import { profile } from "../data/portfolio";
import SocialLinks from "./ui/SocialLinks";

type SidebarProps = {
  active: Section;
  onSelect: (s: Section) => void;
  mobileOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ active, onSelect, mobileOpen, onClose }: SidebarProps) {
  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] border-r border-slate-200 bg-slate-50 text-slate-950 shadow-2xl transition-transform duration-300 md:relative md:z-auto md:flex md:translate-x-0 md:flex-col md:shadow-none ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto p-6">
          <div className="mb-10 flex items-start justify-between">
            <button type="button" onClick={() => onSelect("home")} className="text-left">
              <img
                src={profile.photo}
                alt=""
                className="mb-4 h-12 w-12 rounded-xl object-cover ring-2 ring-blue-600 ring-offset-2"
              />
              <p className="text-lg font-black leading-tight">{profile.name}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                {profile.role}
              </p>
            </button>
            <button type="button" onClick={onClose} className="md:hidden" aria-label="Close menu">
              <X size={22} />
            </button>
          </div>

          <nav className="space-y-1" aria-label="Portfolio navigation">
            {nav.map(({ id, label, icon: Icon }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onSelect(id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`group flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "text-slate-700 hover:bg-white hover:text-blue-700"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={17} aria-hidden="true" /> {label}
                  </span>
                  <ChevronRight
                    size={15}
                    aria-hidden="true"
                    className={isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"}
                  />
                </button>
              );
            })}
          </nav>

          <div className="mt-auto space-y-4 border-t border-slate-200 pt-5">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                Availability
              </p>
              <p className="mt-2 flex items-center gap-2 text-xs font-semibold">
                <span className="h-2 w-2 rounded-full bg-blue-600" /> {profile.availability}
              </p>
            </div>
            <SocialLinks />
          </div>
        </div>
      </aside>
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={onClose}
          aria-label="Close navigation overlay"
        />
      )}
    </>
  );
}
