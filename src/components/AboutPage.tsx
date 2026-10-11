import {
  BadgeCheck,
  GraduationCap,
  Lightbulb,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import Page from "./ui/Page";
import ImageSlider from "./ui/ImageSlider";
import { about, profile } from "../data/portfolio";

const strengthIcons: LucideIcon[] = [Lightbulb, Users, BadgeCheck, Target];

export default function AboutPage() {
  return (
    <Page eyebrow="01 / About" title="An IT student engineering real software.">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <div className="space-y-6">
          <div className="space-y-5 text-base leading-8 text-slate-600">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
              <GraduationCap size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-950">
                {profile.education}
              </p>
              <p className="text-xs font-semibold text-slate-500">
                Year 3 · Registration No. {profile.registration}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {about.strengths.map((s, i) => {
              const Icon = strengthIcons[i % strengthIcons.length];
              return (
                <div
                  key={s.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className="text-blue-600" aria-hidden="true" />
                    <h2 className="text-sm font-bold text-slate-950">{s.title}</h2>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{s.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        <ImageSlider
          images={["/images/barinda_1.jpeg", "/images/barinda.jpeg", "/images/system.jpg"]}
          alt={`${profile.name} portrait`}
          className="aspect-[4/5] lg:sticky lg:top-0"
        />
      </div>
    </Page>
  );
}
