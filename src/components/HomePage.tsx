import { ArrowUpRight, Sparkles } from "lucide-react";
import { Section, Page } from "../App";
import { profile } from "../data/portfolio";

export default function HomePage({ onSelect }: { onSelect: (s: Section) => void }) {
  return (
    <Page
      eyebrow="Software Engineer / Rwanda"
      title="I build software that solves real problems."
    >
      <div className="grid h-full gap-5 lg:grid-cols-[1.4fr_.6fr]">
        <div className="flex flex-col justify-between rounded-2xl border border-gray-400 bg-white p-6 text-white shadow-xl md:p-9">
          <div>
            <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-xl font-black">
              SB
            </div>
            <p className="max-w-2xl leading-8 text-slate-800 md:text-[20px]">
              {profile.bio}
            </p>
             <p className="mt-5 max-w-2xl  leading-8 text-slate-800 md:text-[20px]">
              {profile.bio_1}
            </p>
            <p className="mt-5 max-w-2xl text-[15px] leading-8 text-slate-800 md:text-[20px]">
              {profile.bio_2}
            </p>

          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => onSelect("projects")}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black hover:bg-blue-700"
            >
              View my work <ArrowUpRight size={16} />
            </button>
            <button
              onClick={() => onSelect("contact")}
              className=" text-black/75 rounded-xl border border-gray-400 px-5 py-3 text-sm font-black hover:bg-gray-200"
            >
              Let's talk
            </button>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          <Stat value="02" label="Featured projects" />
          <Stat value="IT" label="RP-Tumba College" />
          <div className="rounded-2xl border border-black/10 bg-blue-600 p-6 text-white shadow-lg">
            <Sparkles size={21} />
            <p className="mt-8 text-sm font-bold leading-6">
              Focused on backend engineering, APIs, testing and clean
              architecture.
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
}
