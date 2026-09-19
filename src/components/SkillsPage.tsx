import { Code2 } from "lucide-react";
import { Page } from "../App";
import { skills } from "../data/portfolio";

export default function SkillsPage() {
  return (
    <Page eyebrow="04 / Skills" title="Tools I use to build.">
      <div className="grid h-full gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <div className="rounded-2xl bg-blue-600 p-7 text-white shadow-xl">
          <Code2 size={25} />
          <p className="mt-8 text-2xl font-black leading-9">
            From frontend interfaces to tested backend APIs.
          </p>
          <p className="mt-4 text-sm leading-7 text-white/75">
            I care about readable code, useful abstractions, validation,
            security, testing and a clean developer experience.
          </p>
        </div>
        <div className="grid content-start grid-cols-2 gap-3 sm:grid-cols-3">
          {skills.map((skill, i) => (
            <div
              key={skill}
              className={`rounded-xl border border-black/10 p-4 shadow-sm ${i % 4 === 0 ? "bg-blue-600 text-white" : "bg-white"}`}
            >
              <p className="text-sm font-black">{skill}</p>
              <p className="mt-2 text-[15px] font-bold uppercase tracking-wider opacity-60">
                Skill {String(i + 1).padStart(2, "0")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}
