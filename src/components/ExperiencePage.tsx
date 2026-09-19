import { BriefcaseBusiness, MessageSquare } from "lucide-react";
import { Page } from "../App";
import { experience, testimonials } from "../data/portfolio";

export default function ExperiencePage() {
  return (
    <Page eyebrow="03 / Experience" title="Learning through real delivery.">
      <div className="grid h-full gap-5 lg:grid-cols-[1.1fr_.9fr] text-slate-800">
        <div className="space-y-4">
          {experience.map((e) => (
            <div
              key={e.title}
              className="rounded-2xl border border-black/10 p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-full bg-blue-600 px-3 py-1 text-[10px] font-black uppercase text-white">
                  {e.period}
                </span>
                <BriefcaseBusiness size={18} />
              </div>
              <h2 className="mt-5 text-xl font-black">{e.title}</h2>
              <p className="mt-3 text-sm leading-7 text-black/60">{e.detail}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-blue-600 p-6 text-white">
          <MessageSquare size={20} className="text-blue-900" />
          <p className="mt-7 text-lg font-black leading-8 text-slate-200">
            “{testimonials[0].quote}”
          </p>
          <p className="mt-5 text-xs font-bold text-white/55">
            {testimonials[0].name} · {testimonials[0].role}
          </p>
          <div className="my-7 border-t border-white/10" />
          <p className="text-lg font-black leading-8 text-slate-200">
            “{testimonials[1].quote}”
          </p>
          <p className="mt-5 text-xs font-bold text-white/45">
            {testimonials[1].name} · {testimonials[1].role}
          </p>
        </div>
      </div>
    </Page>
  );
}