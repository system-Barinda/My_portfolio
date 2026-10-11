import type { ReactNode } from "react";

type PageProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
};

export default function Page({ eyebrow, title, intro, children }: PageProps) {
  return (
    <div className="h-full overflow-y-auto px-5 py-8 md:px-10 md:py-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-[11px] font-black uppercase tracking-[0.25em] text-blue-600">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-balance text-slate-950 md:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            {intro}
          </p>
        )}
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
