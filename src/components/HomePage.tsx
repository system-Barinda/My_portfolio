import { ArrowUpRight, Download, FileText, MapPin } from "lucide-react";
import type { Section } from "../navigation";
import { profile, projects, skillGroups } from "../data/portfolio";
import SocialLinks from "./ui/SocialLinks";

const technologyCount = skillGroups.reduce((n, g) => n + g.items.length, 0);

const stats = [
  { value: "Year 3", label: "IT student" },
  { value: String(projects.length).padStart(2, "0"), label: "Featured projects" },
  { value: `${technologyCount}+`, label: "Technologies" },
];

export default function HomePage({
  onSelect,
}: {
  onSelect: (s: Section) => void;
}) {
  return (
    <div className="h-full overflow-y-auto px-5 py-8 md:px-10 md:py-10">
      <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1.35fr_.65fr]">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-600/20 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
              </span>
              {profile.availability}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <MapPin size={14} aria-hidden="true" /> {profile.location}
            </span>
          </div>

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
            {profile.name} · {profile.role}
          </p>
          <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-tight text-balance text-slate-950 md:text-5xl xl:text-6xl">
            {profile.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            {profile.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onSelect("projects")}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              View projects <ArrowUpRight size={16} aria-hidden="true" />
            </button>
            <a
              href={profile.cvUrl}
              download={profile.cvFileName}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:border-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <Download size={16} aria-hidden="true" /> Download CV
            </a>
            <button
              type="button"
              onClick={() => onSelect("cv")}
              className="inline-flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-bold text-slate-600 transition hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <FileText size={16} aria-hidden="true" /> View CV
            </button>
          </div>

          <SocialLinks className="mt-8" />
        </div>

        <div className="relative mx-auto w-full max-w-xs lg:max-w-none">
          <div className="absolute -inset-3 -z-10 rotate-3 rounded-[2rem] bg-blue-600/90" />
          <img
            src={profile.photo}
            alt={profile.name}
            className="aspect-[4/5] w-full rounded-[1.75rem] border-4 border-white object-cover shadow-2xl"
          />
        </div>
      </div>

      <dl className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <dt className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              {s.label}
            </dt>
            <dd className="mt-2 text-3xl font-black text-slate-950">{s.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
