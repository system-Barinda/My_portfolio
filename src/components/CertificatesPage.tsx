import { lazy, Suspense, useMemo, useState } from "react";
import { Download, ExternalLink, Eye, FileText, FolderOpen, Plus, Trash2 } from "lucide-react";
import Page from "./ui/Page";
import CertificateViewer from "./CertificateViewer";
import {
  categories,
  categoryInfo,
  certificates,
  downloadName,
  isPdf,
  type Certificate,
  type CertificateCategory,
} from "../data/certificates";

type Filter = "all" | CertificateCategory;

const canManage = import.meta.env.DEV;
const UploadCertificateDialog = canManage ? lazy(() => import("./UploadCertificateDialog")) : null;

function Thumbnail({ item }: { item: Certificate }) {
  const { icon: Icon } = categoryInfo(item.category);

  if (!item.file) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-linear-to-br from-blue-600 to-blue-800 text-white">
        <Icon size={42} strokeWidth={1.5} aria-hidden="true" />
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">File coming soon</span>
      </div>
    );
  }

  if (isPdf(item.file)) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-slate-100 text-slate-500">
        <FileText size={46} strokeWidth={1.5} className="text-blue-600" aria-hidden="true" />
        <span className="text-[11px] font-bold uppercase tracking-[0.2em]">PDF document</span>
      </div>
    );
  }

  return (
    <img
      src={item.file}
      alt=""
      loading="lazy"
      className={`h-full w-full transition duration-500 group-hover:scale-[1.03] ${
        item.category === "photo" ? "object-cover object-top" : "object-contain p-3"
      }`}
    />
  );
}

type CardProps = {
  item: Certificate;
  onView: () => void;
  onDelete?: () => void;
};

function CertificateCard({ item, onView, onDelete }: CardProps) {
  const { label, icon: Icon } = categoryInfo(item.category);
  const media = (
    <>
      <Thumbnail item={item} />
      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 shadow-sm">
        <Icon size={12} aria-hidden="true" /> {label}
      </span>
    </>
  );

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      {item.file ? (
        <button
          type="button"
          onClick={onView}
          className="relative aspect-[4/3] overflow-hidden border-b border-slate-200 bg-slate-100"
          aria-label={`View ${item.title}`}
        >
          {media}
        </button>
      ) : (
        <div className="relative aspect-[4/3] overflow-hidden border-b border-slate-200">{media}</div>
      )}

      <div className="flex flex-1 flex-col p-5">
        {item.date && (
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">{item.date}</p>
        )}
        <h2 className="mt-1.5 text-lg font-black leading-snug text-slate-950">{item.title}</h2>
        <p className="mt-1 text-sm font-semibold text-slate-500">{item.issuer}</p>
        {item.description && (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{item.description}</p>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          {item.file ? (
            <>
              <button
                type="button"
                onClick={onView}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
              >
                <Eye size={14} aria-hidden="true" /> View
              </button>
              <a
                href={item.file}
                download={downloadName(item)}
                className="inline-flex items-center gap-2 rounded-lg border border-blue-600 px-4 py-2.5 text-xs font-bold text-blue-700 transition hover:bg-blue-50"
              >
                <Download size={14} aria-hidden="true" /> Download
              </a>
            </>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex cursor-not-allowed items-center rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-400"
            >
              Certificate coming soon
            </span>
          )}
          {item.credentialUrl && (
            <a
              href={item.credentialUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-1 py-2.5 text-xs font-bold text-slate-600 transition hover:text-blue-700"
            >
              Verify <ExternalLink size={13} aria-hidden="true" />
            </a>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="ml-auto rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
              aria-label={`Delete ${item.title}`}
              title="Delete"
            >
              <Trash2 size={15} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default function CertificatesPage() {
  const [items, setItems] = useState<Certificate[]>(certificates);
  const [filter, setFilter] = useState<Filter>("all");
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [manageError, setManageError] = useState("");

  const counts = useMemo(() => {
    const result: Record<Filter, number> = { all: items.length, certificate: 0, award: 0, education: 0, photo: 0 };
    items.forEach((i) => result[i.category]++);
    return result;
  }, [items]);

  const visible = filter === "all" ? items : items.filter((i) => i.category === filter);
  const viewable = visible.filter((i) => i.file);
  const viewIndex = viewable.findIndex((i) => i.id === viewingId);
  const filters: { id: Filter; label: string }[] = [{ id: "all", label: "All" }, ...categories];
  const emptyLabel = filter === "all" ? "items" : categoryInfo(filter).label.toLowerCase();

  const remove = async (item: Certificate) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    setManageError("");
    try {
      const res = await fetch(`/__certificates/${encodeURIComponent(item.id)}`, { method: "DELETE" });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Delete failed.");
      setItems(json.items);
    } catch (err) {
      setManageError(err instanceof Error ? err.message : "Delete failed.");
    }
  };

  return (
    <Page
      eyebrow="05 / Certificates"
      title="Certificates, awards and milestones."
      intro="Credentials, education records and photos from my software engineering journey. Open any item to see it full size or download a copy."
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
          aria-label="Filter by category"
        >
          {filters.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={active}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition ${
                  active
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-blue-600 hover:text-blue-700"
                }`}
              >
                {f.label}
                <span
                  className={`rounded-full px-1.5 text-[10px] ${active ? "bg-white/20" : "bg-slate-100 text-slate-500"}`}
                >
                  {counts[f.id]}
                </span>
              </button>
            );
          })}
        </div>

        {canManage && (
          <button
            type="button"
            onClick={() => setUploadOpen(true)}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            <Plus size={16} aria-hidden="true" /> Add certificate
          </button>
        )}
      </div>

      {manageError && (
        <p role="alert" className="mt-4 text-sm font-semibold text-red-600">
          {manageError}
        </p>
      )}

      {visible.length ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((item) => (
            <CertificateCard
              key={item.id}
              item={item}
              onView={() => setViewingId(item.id)}
              onDelete={canManage ? () => remove(item) : undefined}
            />
          ))}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center rounded-2xl border-2 border-dashed border-slate-200 px-6 py-14 text-center">
          <FolderOpen size={36} strokeWidth={1.5} className="text-blue-600" aria-hidden="true" />
          <p className="mt-4 text-base font-black text-slate-950">No {emptyLabel} yet</p>
          <p className="mt-1 max-w-sm text-sm leading-6 text-slate-500">
            {canManage
              ? "Use “Add certificate” to upload one."
              : "New items will appear here as they are earned."}
          </p>
        </div>
      )}

      {viewIndex >= 0 && (
        <CertificateViewer
          items={viewable}
          index={viewIndex}
          onClose={() => setViewingId(null)}
          onNavigate={(i) => setViewingId(viewable[i].id)}
        />
      )}

      {uploadOpen && UploadCertificateDialog && (
        <Suspense fallback={null}>
          <UploadCertificateDialog onClose={() => setUploadOpen(false)} onUploaded={setItems} />
        </Suspense>
      )}
    </Page>
  );
}
