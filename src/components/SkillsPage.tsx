import { Database, Layout, Server, Wrench, type LucideIcon } from "lucide-react";
import Page from "./ui/Page";
import Tag from "./ui/Tag";
import { skillGroups, type SkillGroup } from "../data/portfolio";

const icons: Record<SkillGroup["id"], LucideIcon> = {
  frontend: Layout,
  backend: Server,
  databases: Database,
  tools: Wrench,
};

export default function SkillsPage() {
  return (
    <Page
      eyebrow="02 / Skills"
      title="Tools I use to build."
      intro="From typed frontend interfaces to tested backend APIs, databases and the tooling that ships them."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {skillGroups.map((group) => {
          const Icon = icons[group.id];
          return (
            <section
              key={group.id}
              aria-labelledby={`skills-${group.id}`}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-600/40 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <div>
                  <h2
                    id={`skills-${group.id}`}
                    className="text-lg font-black text-slate-950"
                  >
                    {group.title}
                  </h2>
                  <p className="text-xs font-medium text-slate-500">
                    {group.description}
                  </p>
                </div>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </Page>
  );
}
