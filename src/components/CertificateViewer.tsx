import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Download, ExternalLink, X } from "lucide-react";
import { categoryInfo, downloadName, isPdf, type Certificate } from "../data/certificates";

type ViewerProps = {
  items: Certificate[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

const iconButton =
  "inline-flex items-center justify-center rounded-lg border border-white/20 p-2 text-white transition hover:bg-white/10";

export default function CertificateViewer({ items, index, onClose, onNavigate }: ViewerProps) {
  const item = items[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const hasMany = items.length > 1;
  const prev = () => onNavigate((index - 1 + items.length) % items.length);
  const next = () => onNavigate((index + 1) % items.length);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (hasMany && e.key === "ArrowLeft") prev();
      else if (hasMany && e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!item?.file) return null;
  const { label } = categoryInfo(item.category);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="viewer-title"
      className="fixed inset-0 z-60 flex flex-col bg-slate-950/95 text-white backdrop-blur-sm animate-[fade-in_.2s_ease-out] motion-reduce:animate-none"
    >
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-400">
            {label}
            {hasMany && ` · ${index + 1} / ${items.length}`}
          </p>
          <h2 id="viewer-title" className="truncate text-base font-black sm:text-lg">
            {item.title}
          </h2>
          <p className="truncate text-xs text-white/60">
            {item.issuer}
            {item.date && ` · ${item.date}`}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={item.file}
            download={downloadName(item)}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold transition hover:bg-blue-700 sm:px-4"
          >
            <Download size={15} aria-hidden="true" />
            <span className="hidden sm:inline">Download</span>
            <span className="sr-only sm:hidden">Download</span>
          </a>
          <a
            href={item.file}
            target="_blank"
            rel="noreferrer"
            className={iconButton}
            aria-label="Open in new tab"
            title="Open in new tab"
          >
            <ExternalLink size={16} aria-hidden="true" />
          </a>
          <button ref={closeRef} type="button" onClick={onClose} className={iconButton} aria-label="Close viewer">
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center p-3 sm:px-20 sm:py-6"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {isPdf(item.file) ? (
          <iframe src={item.file} title={item.title} className="h-full w-full max-w-5xl rounded-lg bg-white" />
        ) : (
          <img
            key={item.id}
            src={item.file}
            alt={item.title}
            className="max-h-full max-w-full rounded-lg object-contain shadow-2xl animate-[fade-in_.25s_ease-out] motion-reduce:animate-none"
          />
        )}

        {hasMany && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous item"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-slate-950/60 p-2.5 ring-1 ring-white/20 transition hover:bg-blue-600 sm:left-5 sm:p-3"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next item"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-slate-950/60 p-2.5 ring-1 ring-white/20 transition hover:bg-blue-600 sm:right-5 sm:p-3"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
