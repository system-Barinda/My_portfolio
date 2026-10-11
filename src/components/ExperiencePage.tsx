import { Award, BriefcaseBusiness } from "lucide-react";
import Page from "./ui/Page";
import { achievements, experience } from "../data/portfolio";

export default function ExperiencePage() {
  return (
    <Page eyebrow="04 / Experience" title="Learning through real delivery.">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
        <ol className="relative space-y-6 border-l-2 border-slate-200 pl-6">
          {experience.map((e) => (
            <li key={e.title} className="relative">
              <span className="absolute -left-[33px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-4 border-white bg-blue-600 shadow" />
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700">
                    {e.period}
                  </span>
                  <BriefcaseBusiness
                    size={18}
                    className="text-slate-400"
                    aria-hidden="true"
                  />
                </div>
                <h2 className="mt-4 text-lg font-black text-slate-950">{e.title}</h2>
                <p className="text-sm font-semibold text-slate-500">
                  {e.organization}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{e.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <section
          aria-labelledby="achievements-heading"
          className="h-fit rounded-2xl bg-slate-950 p-6 text-white md:p-7"
        >
          <div className="flex items-center gap-2 text-blue-400">
            <Award size={20} aria-hidden="true" />
            <h2
              id="achievements-heading"
              className="text-xs font-black uppercase tracking-[0.2em]"
            >
              Achievements & coursework
            </h2>
          </div>
          <ul className="mt-6 space-y-5">
            {achievements.map((a) => (
              <li key={a.title} className="border-t border-white/10 pt-5 first:border-0 first:pt-0">
                <p className="font-bold">{a.title}</p>
                <p className="mt-1 text-sm leading-6 text-white/65">{a.text}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Page>
  );
}
