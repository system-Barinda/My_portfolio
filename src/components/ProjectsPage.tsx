import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Page from "./ui/Page";
import Tag from "./ui/Tag";
import { projects, type Project } from "../data/portfolio";

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="aspect-16/10 overflow-hidden border-b border-slate-200 bg-slate-100">
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-black tracking-[0.18em] text-blue-600">
          PROJECT {project.number}
        </p>
        <h2 className="mt-2 text-xl font-black text-slate-950">{project.title}</h2>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
          {project.type}
        </p>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          {project.description}
        </p>

        <h3 className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-slate-950">
          Challenges solved
        </h3>
        <ul className="mt-3 space-y-2">
          {project.challenges.map((c) => (
            <li key={c} className="flex gap-2 text-sm leading-6 text-slate-600">
              <CheckCircle2
                size={16}
                className="mt-1 shrink-0 text-blue-600"
                aria-hidden="true"
              />
              {c}
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
          {project.stack.map((s) => (
            <li key={s}>
              <Tag>{s}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex gap-2 pt-6">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
          >
            <FaGithub size={14} aria-hidden="true" /> GitHub
          </a>
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-blue-600 px-4 py-2.5 text-xs font-bold text-blue-700 transition hover:bg-blue-50"
            >
              Live demo <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex cursor-not-allowed items-center rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-400"
            >
              Demo coming soon
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  return (
    <Page
      eyebrow="03 / Selected work"
      title="Projects that show how I think."
      intro="Each project highlights the problem, the engineering decisions and the stack used to solve it."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </Page>
  );
}
