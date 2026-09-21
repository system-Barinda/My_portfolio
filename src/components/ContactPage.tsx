import { Mail, Phone, Send, CheckCircle2 } from "lucide-react";
import { useState, FormEvent } from "react";
import { Page } from "../App";
import { profile } from "../data/portfolio";
import { ContactImage } from "./ContactImage";

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
};

function Field({ label, name, type = "text", required = false }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-wider">
        {label}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
      />
    </label>
  );
}

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <Page eyebrow="05 / Contact" title="Let's build something useful.">
      <div className="grid h-full gap-5 lg:grid-cols-[.7fr_1.3fr]">
        <div className="rounded-2xl bg-blue-600 p-6 text-white md:p-7">
          <p className="text-sm leading-7 text-white/70">
            Have a project, opportunity, or idea? Send me a message and let's
            start a conversation.
          </p>
          <div className="mt-8 space-y-5">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 text-sm font-bold hover:text-blue-400"
            >
              <Mail className="text-slate-900" size={18} />
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="flex items-center gap-3 text-sm font-bold hover:text-blue-400"
            >
              <Phone className="text-slate-900" size={18} />
              {profile.phone}
            </a>
            <div className="flex items-center gap-3 text-sm font-bold">
              <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-slate-900 text-[9px] font-black">
                RW
              </span>
              {profile.location}
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-5 text-xs font-bold text-white/70">
            
            <code>SYSTEM SYLVERE BARINDA</code>.
          </div>
          <ContactImage />
        </div>
        <form
          onSubmit={submit}
          className="rounded-2xl border border-black/10 p-6 shadow-sm md:p-7"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Your name" name="name" required />
            <Field label="Your email" name="email" type="email" required />
          </div>
          <Field label="Subject" name="subject" required />
          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-wider">
              Message
            </span>
            <textarea
              name="message"
              required
              rows={5}
              className="w-full resize-none rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
              placeholder="Tell me about your project..."
            />
          </label>
          <button className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">
            <Send size={16} /> Send message
          </button>
          {sent && (
            <p className="mt-3 flex items-center gap-2 text-xs font-bold text-blue-700">
              <CheckCircle2 size={16} /> Form captured successfully. Connect an
              email endpoint to receive it.
            </p>
          )}
        </form>
      </div>
    </Page>
  );
}