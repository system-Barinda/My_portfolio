import { Award, Camera, GraduationCap, ShieldCheck, type LucideIcon } from "lucide-react";
import data from "./certificates.json";

export type CertificateCategory = "certificate" | "award" | "education" | "photo";

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  category: CertificateCategory;
  description?: string;
  credentialUrl?: string;
  /** Path under public/, e.g. /certificates/my-award.jpg. Omit until the file is available. */
  file?: string;
};

export const certificates = data as Certificate[];

export const categories: { id: CertificateCategory; label: string; icon: LucideIcon }[] = [
  { id: "certificate", label: "Certificates", icon: ShieldCheck },
  { id: "award", label: "Awards", icon: Award },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "photo", label: "Photos", icon: Camera },
];

export const categoryInfo = (id: CertificateCategory) =>
  categories.find((c) => c.id === id) ?? categories[0];

export const isPdf = (file: string) => file.toLowerCase().endsWith(".pdf");

export const downloadName = (item: Certificate) => {
  const ext = item.file?.split(".").pop() ?? "";
  const base = item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return `${base || "certificate"}.${ext}`;
};
