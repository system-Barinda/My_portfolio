import { Download, ExternalLink, FileText } from "lucide-react";
import Page from "./ui/Page";
import { profile } from "../data/portfolio";

export default function CvPage() {
  const pageCount = profile.cvPages.length;

  return (
    <Page
      eyebrow="Curriculum vitae"
      title="Read my CV"
      intro="My full CV, right here in the browser. Scroll to read it, or download the PDF to keep a copy."
    >
      <div className="mb-4 flex sm:mb-6 flex-col gap-4 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FileText size={22} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-950">{profile.cvFileName}</p>
            <p className="text-xs font-semibold text-slate-500">
              PDF · {pageCount} {pageCount === 1 ? "page" : "pages"}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex">
          <a
            href={profile.cvUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:border-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <ExternalLink size={16} aria-hidden="true" /> Open PDF
          </a>
          <a
            href={profile.cvUrl}
            download={profile.cvFileName}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <Download size={16} aria-hidden="true" /> Download
          </a>
        </div>
      </div>

      <p className="mb-4 text-xs font-semibold text-slate-500 sm:hidden">
        Tip: tap a page to open it full size and zoom in.
      </p>

      <div className="rounded-3xl bg-slate-100 p-2 sm:p-6 md:p-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          {profile.cvPages.map((src, index) => (
            <figure key={src}>
              <a
                href={src}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open page ${index + 1} full size`}
                className="block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
              >
                <img
                  src={src}
                  alt={`${profile.name} CV, page ${index + 1} of ${pageCount}`}
                  width={1600}
                  height={2071}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="h-auto w-full rounded-lg bg-white shadow-xl ring-1 ring-black/5 transition hover:shadow-2xl"
                />
              </a>
              <figcaption className="mt-2 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Page {index + 1} of {pageCount}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Page>
  );
}
