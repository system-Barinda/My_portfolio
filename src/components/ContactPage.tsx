import { useState, type ChangeEvent, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { AlertCircle, CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import Page from "./ui/Page";
import SocialLinks from "./ui/SocialLinks";
import { profile } from "../data/portfolio";

type FormValues = { name: string; email: string; subject: string; message: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;
type Status = "idle" | "sending" | "success" | "error";

const initialValues: FormValues = { name: "", email: "", subject: "", message: "" };

const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};
const emailjsEnabled = Boolean(
  emailjsConfig.serviceId && emailjsConfig.templateId && emailjsConfig.publicKey,
);

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Please enter a valid email address.";
  if (!values.subject.trim()) errors.subject = "Please add a subject.";
  if (values.message.trim().length < 10)
    errors.message = "Message should be at least 10 characters.";
  return errors;
}

const inputClass =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10";

type FieldProps = {
  id: keyof FormValues;
  label: string;
  value: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  placeholder?: string;
  multiline?: boolean;
  autoComplete?: string;
};

function Field({ id, label, value, error, onChange, type = "text", placeholder, multiline, autoComplete }: FieldProps) {
  const shared = {
    id,
    name: id,
    value,
    onChange,
    placeholder,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${id}-error` : undefined,
    className: `${inputClass} ${error ? "border-red-500" : "border-slate-300"}`,
  };
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
        {label}
      </label>
      {multiline ? (
        <textarea {...shared} rows={5} className={`${shared.className} resize-none`} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} />
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-semibold text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!emailjsEnabled) {
      const body = `${values.message}\n\n— ${values.name} (${values.email})`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
      setStatus("success");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        emailjsConfig.serviceId!,
        emailjsConfig.templateId!,
        {
          from_name: values.name,
          reply_to: values.email,
          subject: values.subject,
          message: values.message,
        },
        { publicKey: emailjsConfig.publicKey! },
      );
      setStatus("success");
      setValues(initialValues);
    } catch {
      setStatus("error");
    }
  };

  return (
    <Page eyebrow="05 / Contact" title="Let's build something useful.">
      <div className="grid gap-6 lg:grid-cols-[.75fr_1.25fr]">
        <aside className="flex flex-col rounded-2xl bg-blue-600 p-6 text-white md:p-7">
          <p className="text-base leading-7 text-white/85">
            Have a project, an internship or a role in mind? Send me a message and I&apos;ll get back to you.
          </p>
          <ul className="mt-8 space-y-4 text-sm font-semibold">
            <li>
              <a href={`mailto:${profile.email}`} className="flex items-center gap-3 break-all hover:underline">
                <Mail size={18} aria-hidden="true" /> {profile.email}
              </a>
            </li>
            <li>
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:underline">
                <Phone size={18} aria-hidden="true" /> {profile.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={18} aria-hidden="true" /> {profile.location}
            </li>
          </ul>
          <div className="mt-8 border-t border-white/20 pt-6 lg:mt-auto">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
              Find me online
            </p>
            <SocialLinks variant="inverted" />
          </div>
        </aside>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-7"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="name" label="Name" value={values.name} error={errors.name} onChange={handleChange} placeholder="Jane Doe" autoComplete="name" />
            <Field id="email" label="Email" type="email" value={values.email} error={errors.email} onChange={handleChange} placeholder="jane@company.com" autoComplete="email" />
          </div>
          <Field id="subject" label="Subject" value={values.subject} error={errors.subject} onChange={handleChange} placeholder="Job opportunity" />
          <Field id="message" label="Message" multiline value={values.message} error={errors.message} onChange={handleChange} placeholder="Tell me about your project or role..." />

          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
          >
            {status === "sending" ? (
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            ) : (
              <Send size={16} aria-hidden="true" />
            )}
            {status === "sending" ? "Sending..." : "Send message"}
          </button>

          <div aria-live="polite">
            {status === "success" && (
              <p className="flex items-center gap-2 text-sm font-semibold text-blue-700">
                <CheckCircle2 size={16} aria-hidden="true" />
                {emailjsEnabled ? "Thanks! Your message has been sent." : "Opening your email app to send the message..."}
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-sm font-semibold text-red-600">
                <AlertCircle size={16} aria-hidden="true" />
                Something went wrong. Please email me directly at {profile.email}.
              </p>
            )}
          </div>
        </form>
      </div>
    </Page>
  );
}
