import { useEffect, useState, type ChangeEvent, type DragEvent, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { AlertCircle, FileText, Loader2, Upload, X } from "lucide-react";
import { categories, type Certificate, type CertificateCategory } from "../data/certificates";

type UploadProps = {
  onClose: () => void;
  onUploaded: (items: Certificate[]) => void;
};

type Values = {
  title: string;
  issuer: string;
  date: string;
  category: CertificateCategory;
  description: string;
  credentialUrl: string;
};

const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const MAX_BYTES = 10 * 1024 * 1024;
const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10";
const labelClass = "mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700";

const readAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read the file."));
    reader.readAsDataURL(file);
  });

const formatSize = (bytes: number) =>
  bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.ceil(bytes / 1024)} KB`;

export default function UploadCertificateDialog({ onClose, onUploaded }: UploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [dragging, setDragging] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [values, setValues] = useState<Values>({
    title: "",
    issuer: "",
    date: "",
    category: "certificate",
    description: "",
    credentialUrl: "",
  });

  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview);
    },
    [preview],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !sending) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, sending]);

  const pickFile = (picked?: File) => {
    if (!picked) return;
    if (!ACCEPTED.includes(picked.type)) return setError("Upload a JPG, PNG, WEBP or PDF file.");
    if (picked.size > MAX_BYTES) return setError("File is too large (max 10 MB).");
    setError("");
    setFile(picked);
    setPreview(picked.type.startsWith("image/") ? URL.createObjectURL(picked) : "");
    if (!values.title) {
      setValues((v) => ({ ...v, title: picked.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ") }));
    }
  };

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    pickFile(e.dataTransfer.files[0]);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return setError("Choose a file to upload.");
    if (!values.title.trim() || !values.issuer.trim()) return setError("Title and issuer are required.");

    setSending(true);
    setError("");
    try {
      const res = await fetch("/__certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, dataUrl: await readAsDataUrl(file) }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Upload failed.");
      onUploaded(json.items);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
      setSending(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/70 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={(e) => e.target === e.currentTarget && !sending && onClose()}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="upload-title"
        onSubmit={submit}
        noValidate
        className="max-h-[92dvh] w-full max-w-xl overflow-y-auto rounded-t-2xl bg-white p-5 shadow-2xl animate-[fade-in_.25s_ease-out] motion-reduce:animate-none sm:rounded-2xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-blue-600">Owner tools</p>
            <h2 id="upload-title" className="mt-1 text-2xl font-black tracking-tight text-slate-950">
              Add a certificate
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={sending}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
            aria-label="Close"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <label
          htmlFor="certificate-file"
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`mt-6 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-5 text-center transition ${
            dragging ? "border-blue-600 bg-blue-50" : "border-slate-300 bg-slate-50 hover:border-blue-600 hover:bg-blue-50/50"
          }`}
        >
          {file ? (
            <>
              {preview ? (
                <img src={preview} alt="" className="max-h-44 rounded-lg object-contain shadow-sm" />
              ) : (
                <FileText size={44} strokeWidth={1.5} className="text-blue-600" aria-hidden="true" />
              )}
              <span className="max-w-full truncate text-sm font-bold text-slate-950">{file.name}</span>
              <span className="text-xs font-semibold text-slate-500">
                {formatSize(file.size)} · <span className="text-blue-700 underline">Change file</span>
              </span>
            </>
          ) : (
            <>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-md shadow-blue-600/20">
                <Upload size={20} aria-hidden="true" />
              </span>
              <span className="text-sm font-bold text-slate-950">Drop a file here or click to browse</span>
              <span className="text-xs font-semibold text-slate-500">JPG, PNG, WEBP or PDF · max 10 MB</span>
            </>
          )}
          <input
            id="certificate-file"
            type="file"
            accept={ACCEPTED.join(",")}
            className="sr-only"
            onChange={(e) => pickFile(e.target.files?.[0])}
          />
        </label>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="title" className={labelClass}>Title *</label>
            <input id="title" name="title" value={values.title} onChange={onChange} className={inputClass} placeholder="e.g. Java Spring Boot Certificate" />
          </div>
          <div>
            <label htmlFor="issuer" className={labelClass}>Issued by *</label>
            <input id="issuer" name="issuer" value={values.issuer} onChange={onChange} className={inputClass} placeholder="e.g. TheGym Rwanda" />
          </div>
          <div>
            <label htmlFor="category" className={labelClass}>Category</label>
            <select id="category" name="category" value={values.category} onChange={onChange} className={inputClass}>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="date" className={labelClass}>Date</label>
            <input id="date" name="date" value={values.date} onChange={onChange} className={inputClass} placeholder="e.g. March 2026" />
          </div>
          <div>
            <label htmlFor="credentialUrl" className={labelClass}>Credential link</label>
            <input id="credentialUrl" name="credentialUrl" type="url" value={values.credentialUrl} onChange={onChange} className={inputClass} placeholder="https://…" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="description" className={labelClass}>Description</label>
            <textarea id="description" name="description" rows={3} value={values.description} onChange={onChange} className={`${inputClass} resize-none`} placeholder="What did you learn or achieve?" />
          </div>
        </div>

        {error && (
          <p role="alert" className="mt-4 flex items-center gap-2 text-sm font-semibold text-red-600">
            <AlertCircle size={16} aria-hidden="true" /> {error}
          </p>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-slate-500">
            Saved to <code className="font-semibold">public/certificates/</code>. Commit the changes to publish.
          </p>
          <button
            type="submit"
            disabled={sending}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-70"
          >
            {sending ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <Upload size={16} aria-hidden="true" />}
            {sending ? "Uploading…" : "Upload"}
          </button>
        </div>
      </form>
    </div>,
    document.body,
  );
}
