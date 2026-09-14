import { Mail, Phone, MapPin } from "lucide-react";
import { profile } from "../data/portfolio";

export default function Footer() {
  return (
    <footer>
      <div>
        <b>Let's build something useful.</b>
        <span>
          Open to software engineering opportunities and meaningful projects.
        </span>
      </div>
      <div className="footer-links">
        <a href={"mailto:" + profile.email}>
          <Mail size={15} /> {profile.email}
        </a>
        <a href={"tel:" + profile.phone}>
          <Phone size={15} /> {profile.phone}
        </a>
        <span>
          <MapPin size={15} /> Rwanda
        </span>
        <a href="#">
           LinkedIn
        </a>
        <a href="#">
        GitHub
        </a>
      </div>
    </footer>
  );
}
