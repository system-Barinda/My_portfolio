import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Download,
  GraduationCap,
  Home,
  Mail,
  Menu,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import {
  experience,
  profile,
  projects,
  skills,
  testimonials,
} from "./data/portfolio";

type Section =
  | "home"
  | "about"
  | "projects"
  | "experience"
  | "skills"
  | "contact";

const nav: { id: Section; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Overview", icon: Home },
  { id: "about", label: "About me", icon: UserRound },
  { id: "projects", label: "Projects", icon: Code2 },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "skills", label: "Skills", icon: Zap },
  { id: "contact", label: "Contact", icon: Mail },
];

function App() {
  const [active, setActive] = useState<Section>("home");
  const [mobileMenu, setMobileMenu] = useState(false);

  const select = (section: Section) => {
    setActive(section);
    setMobileMenu(false);
  };

  return (
    <main className="h-full min-h-screen bg-blue-600 text-black md:p-4">
      <div className="mx-auto flex h-full max-w-[1500px] flex-col overflow-hidden bg-white shadow-2xl md:flex-row md:rounded-2xl md:border md:border-black/10">
        <Sidebar
          active={active}
          onSelect={select}
          mobileOpen={mobileMenu}
          onClose={() => setMobileMenu(false)}
        />

        <section className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-black/10 bg-white px-5 md:h-20 md:px-8">
            <button
              onClick={() => setMobileMenu(true)}
              className="flex items-center gap-2 text-sm font-bold md:hidden"
              aria-label="Open menu"
            >
              <Menu size={21} /> Menu
            </button>
            <div className="hidden text-xs font-bold uppercase tracking-[0.22em] text-black/45 md:block">
              {String(active).replace("-", " ")}
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden text-xs font-semibold text-black/50 sm:block">
                Based in Rwanda
              </span>
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600 shadow-[0_0_0_5px_rgba(37,99,235,0.12)]" />
            </div>
          </header>

          <div className="min-h-0 flex-1 overflow-hidden">
            <Content active={active} onSelect={select} />
          </div>

          <Footer onSelect={select} />
        </section>
      </div>
    </main>
  );
}

function Sidebar({
  active,
  onSelect,
  mobileOpen,
  onClose,
}: {
  active: Section;
  onSelect: (s: Section) => void;
  mobileOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[300px] border-r border-gray-600 bg-gray-300 text-black shadow-2xl transition-transform duration-300 md:relative md:flex md:w-[300px] md:translate-x-0 md:flex-col md:shadow-none ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-full flex-col p-6">
          <div className="mb-10 flex items-start justify-between">
            <button onClick={() => onSelect("home")} className="text-left">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-black">
                SB
              </div>
              <p className="text-lg font-black leading-tight">
                System Sylvere
                <br />
                Barinda
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900">
                Software Engineer
              </p>
            </button>
            <button
              onClick={onClose}
              className="md:hidden"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="space-y-1" aria-label="Portfolio navigation">
            {nav.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onSelect(id)}
                className={`group flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-bold transition ${active === id ? "bg-blue-600 text-white" : "text-slate-900 hover:bg-white/10 hover:text-white"}`}
              >
                <span className="flex items-center gap-3">
                  <Icon size={17} /> {label}
                </span>
                <ChevronRight
                  size={15}
                  className={`${active === id ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`}
                />
              </button>
            ))}
          </nav>

          <div className="mt-auto space-y-4 border-t border-gray-600 pt-5">
            <div className="rounded-xl border border-gray-600 bg-white/5 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-700">
                Availability
              </p>
              <div className="mt-2 flex items-center gap-2 text-xs font-semibold">
                <span className="h-2 w-2 rounded-full bg-blue-500" /> Open to
                opportunities
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-gray-600 p-2.5 hover:bg-gray-600"
              ></a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-gray-800 rounded-lg border border-gray-600 p-2.5 hover:bg-gray-600"
              ></a>
              <a
                href={`mailto:${profile.email}`}
                className="text-gray-800 rounded-lg border border-gray-600 p-2.5 hover:bg-gray-600"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>
      </aside>
      {mobileOpen && (
        <button
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={onClose}
          aria-label="Close navigation overlay"
        />
      )}
    </>
  );
}

function Content({
  active,
  onSelect,
}: {
  active: Section;
  onSelect: (s: Section) => void;
}) {
  const pages: Record<Section, ReactNode> = {
    home: <HomePage onSelect={onSelect} />,
    about: <AboutPage />,
    projects: <ProjectsPage />,
    experience: <ExperiencePage />,
    skills: <SkillsPage />,
    contact: <ContactPage />,
  };
  return <div className="h-full overflow-hidden">{pages[active]}</div>;
}

function Page({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="h-full overflow-y-auto px-5 py-7 md:overflow-hidden md:px-10 md:py-9">
      <div className="mx-auto flex h-full max-w-5xl flex-col">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-600">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">
          {title}
        </h1>
        <div className="mt-7 min-h-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

function HomePage({ onSelect }: { onSelect: (s: Section) => void }) {
  return (
    <Page
      eyebrow="Software Engineer / Rwanda"
      title="I build software that solves real problems."
    >
      <div className="grid h-full gap-5 lg:grid-cols-[1.4fr_.6fr]">
        <div className="flex flex-col justify-between rounded-2xl border border-gray-400 bg-white p-6 text-white shadow-xl md:p-9">
          <div>
            <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-xl font-black">
              SB
            </div>
            <p className="max-w-2xl leading-8 text-slate-800 md:text-[20px]">
              {profile.bio}
            </p>
             <p className="mt-5 max-w-2xl  leading-8 text-slate-800 md:text-[20px]">
              {profile.bio_1}
            </p>
            <p className="mt-5 max-w-2xl text-[15px] leading-8 text-slate-800 md:text-[20px]">
              {profile.bio_2}
            </p>

          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => onSelect("projects")}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black hover:bg-blue-700"
            >
              View my work <ArrowUpRight size={16} />
            </button>
            <button
              onClick={() => onSelect("contact")}
              className=" text-black/75 rounded-xl border border-gray-400 px-5 py-3 text-sm font-black hover:bg-gray-200"
            >
              Let's talk
            </button>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          <Stat value="02" label="Featured projects" />
          <Stat value="IT" label="RP-Tumba College" />
          <div className="rounded-2xl border border-black/10 bg-blue-600 p-6 text-white shadow-lg">
            <Sparkles size={21} />
            <p className="mt-8 text-sm font-bold leading-6">
              Focused on backend engineering, APIs, testing and clean
              architecture.
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <p className="text-4xl font-black">{value}</p>
      <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-black/45">
        {label}
      </p>
    </div>
  );
}


function ProfileImageSlider() {
  const images = [
    "/images/barinda_1.jpeg",
    "/images/barinda.jpeg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((previous) => (previous + 1) % images.length);
    }, 500000); // Changes every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-black/10 shadow-sm">
      <div className="relative aspect-[16/9] w-full">
        {images.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`System Sylvere Barinda profile ${index + 1}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              currentImage === index
                ? "opacity-100"
                : "opacity-0"
            }`}
          />
        ))}

        {/* Small slide indicators */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, index) => (
            <span
              key={index}
              className={`h-2 rounded-full transition-all duration-500 ${
                currentImage === index
                  ? "w-6 bg-blue-500"
                  : "w-2 bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


function AboutPage() {
  return (
    <Page eyebrow="01 / About" title="A developer who keeps learning.">
      <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <div className="rounded-2xl border border-black/10 p-6 shadow-sm md:p-8">
          <p className="text-base leading-8 text-black/65"> My journey into software engineering started with software development studies at <strong className="text-black">TSS-Mutovu</strong>, where I discovered my passion for technology and learned the fundamentals of building software. I continued developing my knowledge through Information Technology at <strong className="text-black">RP-Tumba College</strong>, where I strengthened my technical foundation through practical learning and hands-on projects. </p>
          <p className="mt-5 text-base leading-8 text-black/65"> I also had the opportunity to train in software engineering through <strong className="text-black"> TheGym Rwanda</strong>. This experience helped me move beyond learning concepts and develop a real engineering mindset. I learned how to design and build reliable <strong className="text-black"> backend and frontend applications</strong>, create APIs, work with databases, implement authentication and authorization, write automated tests, and structure applications using clean and maintainable code. </p>
          <p className="mt-5 text-base leading-8 text-black/65">
           I enjoy transforming real-world problems into well-designed software. I believe good engineering is not only about writing code it is about understanding the problem, creating simple solutions, building with quality, and continuously improving the final product.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <Info
              icon={<GraduationCap size={18} />}
              title="Education"
              text={profile.education}
            />
            <Info
              icon={<Code2 size={18} />}
              title="Focus"
              text="Backend + full-stack"
            />
          </div>
        </div>
       <div className="space-y-6">

  {/* What I Bring */}
  <div className="rounded-2xl bg-black p-6 text-white md:p-8">
    <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">
      What I bring
    </p>

    <div className="mt-7 space-y-5">
      {[
        "Curiosity and continuous learning",
        "Team communication and ownership",
        "Clean, testable implementation",
        "Problem solving with a user mindset",
      ].map((x) => (
        <div
          key={x}
          className="flex gap-3 text-sm font-semibold"
        >
          <CheckCircle2
            className="shrink-0 text-blue-500"
            size={18}
          />

          <span>{x}</span>
        
        </div>

      ))}
    
    </div>
  </div>
  

  {/* Automatic Profile Image Slider */}
  <ProfileImageSlider />

</div>
      </div>
    </Page>
  );
}
function Info({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl bg-black/[.03] p-4">
      <div className="flex items-center gap-2 text-blue-600">
        {icon}
        <span className="text-xs font-black uppercase tracking-wider">
          {title}
        </span>
      </div>
      <p className="mt-2 text-sm font-bold">{text}</p>
    </div>
  );
}

function ProjectsPage() {
  return (
    <Page eyebrow="02 / Selected work" title="Projects that show how I think.">
      <div className="grid h-full gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.id}
            className="group flex flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl md:p-7"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-blue-600">
                PROJECT {p.number}
              </span>
              <ArrowUpRight
                size={18}
                className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </div>
            <h2 className="mt-8 text-2xl font-blue-600 text-blue-800 font-bold">{p.title}</h2>
            <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-black/40">
              {p.type}
            </p>
            <p className="mt-5 text-sm leading-7  text-gray-900">
              {p.description}
            </p>
            <p className="mt-4 rounded-xl bg-blue-50 p-3 text-xs font-bold leading-5 text-blue-900">
              {p.impact}
            </p>
            <div className="mt-auto pt-6">
              <div className="flex flex-wrap gap-2 ">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-black/10 px-3 py-1 text-[20px] font-black text-blue-400"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex gap-2">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2.5 text-xs font-blue-900 text-white"
                >
                  GitHub 
                </a>
                <a
                  href={p.demo}
                  className="rounded-lg border border-blue-900 px-4 py-2.5 text-xs font-blue-900 font-bold"
                >
                  Live demo
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Page>
  );
}

function ExperiencePage() {
  return (
    <Page eyebrow="03 / Experience" title="Learning through real delivery.">
      <div className="grid h-full gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <div className="space-y-4">
          {experience.map((e) => (
            <div
              key={e.title}
              className="rounded-2xl border border-black/10 p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-full bg-blue-600 px-3 py-1 text-[10px] font-black uppercase text-white">
                  {e.period}
                </span>
                <BriefcaseBusiness size={18} />
              </div>
              <h2 className="mt-5 text-xl font-black">{e.title}</h2>
              <p className="mt-3 text-sm leading-7 text-black/60">{e.detail}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-black p-6 text-white">
          <MessageSquare size={20} className="text-blue-500" />
          <p className="mt-7 text-lg font-black leading-8">
            “{testimonials[0].quote}”
          </p>
          <p className="mt-5 text-xs font-bold text-white/45">
            {testimonials[0].name} · {testimonials[0].role}
          </p>
          <div className="my-7 border-t border-white/10" />
          <p className="text-lg font-black leading-8">
            “{testimonials[1].quote}”
          </p>
          <p className="mt-5 text-xs font-bold text-white/45">
            {testimonials[1].name} · {testimonials[1].role}
          </p>
        </div>
      </div>
    </Page>
  );
}

function SkillsPage() {
  return (
    <Page eyebrow="04 / Skills" title="Tools I use to build.">
      <div className="grid h-full gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <div className="rounded-2xl bg-blue-600 p-7 text-white shadow-xl">
          <Code2 size={25} />
          <p className="mt-8 text-2xl font-black leading-9">
            From frontend interfaces to tested backend APIs.
          </p>
          <p className="mt-4 text-sm leading-7 text-white/75">
            I care about readable code, useful abstractions, validation,
            security, testing and a clean developer experience.
          </p>
        </div>
        <div className="grid content-start grid-cols-2 gap-3 sm:grid-cols-3">
          {skills.map((skill, i) => (
            <div
              key={skill}
              className={`rounded-xl border border-black/10 p-4 shadow-sm ${i % 4 === 0 ? "bg-black text-white" : "bg-white"}`}
            >
              <p className="text-sm font-black">{skill}</p>
              <p className="mt-2 text-[9px] font-bold uppercase tracking-wider opacity-40">
                Skill {String(i + 1).padStart(2, "0")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <Page eyebrow="05 / Contact" title="Let's build something useful.">
      <div className="grid h-full gap-5 lg:grid-cols-[.7fr_1.3fr]">
        <div className="rounded-2xl bg-black p-6 text-white md:p-7">
          <p className="text-sm leading-7 text-white/60">
            Have a project, opportunity, or idea? Send me a message and let's
            start a conversation.
          </p>
          <div className="mt-8 space-y-5">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 text-sm font-bold hover:text-blue-400"
            >
              <Mail className="text-blue-500" size={18} />
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="flex items-center gap-3 text-sm font-bold hover:text-blue-400"
            >
              <Phone className="text-blue-500" size={18} />
              {profile.phone}
            </a>
            <div className="flex items-center gap-3 text-sm font-bold">
              <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-blue-600 text-[9px] font-black">
                RW
              </span>
              {profile.location}
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-5 text-xs font-bold text-white/40">
            Replace the placeholder contact details in{" "}
            <code>src/data/portfolio.ts</code>.
          </div>
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
function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="mb-4 block">
      <span className="mb-2 block text-xs font-black uppercase tracking-wider">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
      />
    </label>
  );
}

function Footer({ onSelect }: { onSelect: (s: Section) => void }) {
  return (
    <footer className="flex min-h-14 shrink-0 items-center justify-between border-t border-black/10 bg-white px-5 py-3 md:px-8">
      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-wider text-black/45">
        <span>© {new Date().getFullYear()} System Sylvere Barinda</span>
      </div>
      <div className="hidden items-center gap-5 text-[10px] text-slate-900 font-bold uppercase tracking-wider md:flex">
        <button
          onClick={() => onSelect("about")}
          className="hover:text-blue-600"
        >
          About
        </button>
        <button
          onClick={() => onSelect("projects")}
          className="hover:text-blue-600"
        >
          Work
        </button>
        <button
          onClick={() => onSelect("contact")}
          className="hover:text-blue-600"
        >
          Contact
        </button>
        <a
          href={`mailto:${profile.email}`}
          className="flex items-center gap-1.5 hover:text-blue-600"
        >
          <Mail size={12} /> Email
        </a>
      </div>
      <a
        href="/cv.pdf"
        download
        className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider hover:text-blue-600"
      >
        <Download size={12} /> CV
      </a>
    </footer>
  );
}

export default App;
