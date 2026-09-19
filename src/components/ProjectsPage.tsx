import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/portfolio";
import Page from "./Page";

export default function ProjectsPage() {
  return (
    <Page eyebrow="02 / Selected work" title="Projects that show how I think.">
      <div className="grid h-full gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.id}
            className="group flex flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl md:p-7"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-blue-600">
                PROJECT {p.number}
              </span>
              <ArrowUpRight
                size={18}
                className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </div>
            <h2 className="mt-8 text-2xl font-blue-600 text-blue-800 font-bold">{p.title}</h2>
            <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-black/40">
              {p.type}
            </p>
            <p className="mt-5 text-sm leading-7  text-gray-900">
              {p.description}
            </p>
            <p className="mt-4 rounded-xl bg-blue-50 p-3 text-xs font-bold leading-5 text-blue-900">
              {p.impact}
            </p>
            <div className="mt-auto pt-6">
              <div className="flex flex-wrap gap-2 ">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-black/10 px-3 py-1 text-[20px] font-black text-blue-400"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex gap-2">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2.5 text-xs font-blue-900 text-white"
                >
                  GitHub 
                </a>
                <a
                  href={p.demo}
                  className="rounded-lg border border-blue-900 px-4 py-2.5 text-xs font-blue-900 font-bold"
                >
                  Live demo
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Page>
  );
}