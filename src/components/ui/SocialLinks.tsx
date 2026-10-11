import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profile } from "../../data/portfolio";

const links = [
  { label: "GitHub", href: profile.github, icon: FaGithub, external: true },
  { label: "LinkedIn", href: profile.linkedin, icon: FaLinkedin, external: true },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail, external: false },
];

type SocialLinksProps = {
  variant?: "light" | "inverted";
  className?: string;
};

export default function SocialLinks({
  variant = "light",
  className = "",
}: SocialLinksProps) {
  const tone =
    variant === "light"
      ? "border-slate-200 bg-white text-slate-700 hover:border-blue-600 hover:text-blue-600"
      : "border-white/30 bg-white/10 text-white hover:bg-white hover:text-blue-600";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {links.map(({ label, href, icon: Icon, external }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          title={label}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          className={`rounded-lg border p-2.5 transition ${tone}`}
        >
          <Icon size={16} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
