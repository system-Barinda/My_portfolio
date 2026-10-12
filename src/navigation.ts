import {
  Award,
  BriefcaseBusiness,
  Code2,
  FileText,
  Home,
  Mail,
  UserRound,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type Section =
  | "home"
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "certificates"
  | "cv"
  | "contact";

export const nav: { id: Section; label: string; icon: LucideIcon }[] = [
  { id: "home", label: "Overview", icon: Home },
  { id: "about", label: "About me", icon: UserRound },
  { id: "skills", label: "Skills", icon: Zap },
  { id: "projects", label: "Projects", icon: Code2 },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "cv", label: "My CV", icon: FileText },
  { id: "contact", label: "Contact", icon: Mail },
];

export const isSection = (value: string): value is Section =>
  nav.some((item) => item.id === value);
