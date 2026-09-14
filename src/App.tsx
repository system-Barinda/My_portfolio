import { useState } from "react";
import {
  ArrowUpRight,
  Download,
  ExternalLink,
  Send,
  CheckCircle2,
} from "lucide-react";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import {
  profile,
  projects,
  skills,
  experience,
  testimonials,
} from "./data/portfolio";
function Home({ setPage }: { setPage: (p: string) => void }) {
  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">SOFTWARE ENGINEER · RWANDA</p>
          <h1>
            Building software
            <br />
            <em>people can rely on.</em>
          </h1>
          <p className="lead">{profile.summary}</p>
          <div className="actions">
            <button onClick={() => setPage("projects")} className="primary">
              View my work <ArrowUpRight size={17} />
            </button>
            <button
              className="secondary"
              onClick={() => document.getElementById("cv")?.click()}
            >
              <Download size={17} /> Resume
            </button>
          </div>
        </div>
        <div className="portrait">
          <img
            src="/images/profile-placeholder.svg"
            alt="System Sylvere Barinda"
          />
          <span>01 / 06</span>
        </div>
      </section>
      <section className="home-grid">
        <div>
          <label>SELECTED WORK</label>
          {projects.map((p) => (
            <button
              className="project-row"
              onClick={() => setPage("projects")}
              key={p.id}
            >
              <span>
                <b>{p.title}</b>
                <small>{p.category}</small>
              </span>
              <ArrowUpRight size={19} />
            </button>
          ))}
        </div>
        <div className="quote">
          <label>WHY ME</label>
          <p>
            “I learn fast, communicate with purpose, and care about building
            software that is clean, tested and useful.”
          </p>
          <small>— System Sylvere Barinda</small>
        </div>
      </section>
    </>
  );
}
function About() {
  return (
    <>
      <Header title="About me" kicker="PROFILE" />
      <div className="two-col">
        <div>
          <h2>From IT foundations to software engineering.</h2>
          <p>
            I studied Information Technology at RP-Tumba College, where I built
            my foundation in programming and technology. Through hands-on
            projects and team training, I have grown toward software engineering
            with a strong interest in backend systems, APIs, testing and
            maintainable architecture.
          </p>
          <p>
            My goal is simple: join a team where I can contribute, keep learning
            from experienced engineers and turn requirements into reliable
            products.
          </p>
        </div>
        <div className="facts">
          <div>
            <b>Education</b>
            <span>{profile.education}</span>
          </div>
          <div>
            <b>Focus</b>
            <span>Backend · APIs · Testing · React</span>
          </div>
          <div>
            <b>Location</b>
            <span>Rwanda</span>
          </div>
        </div>
      </div>
      <div className="testimonials">
        {testimonials.map((t) => (
          <div className="card" key={t.name}>
            <span>“</span>
            <p>{t.quote}</p>
            <b>{t.name}</b>
            <small>{t.role}</small>
          </div>
        ))}
      </div>
    </>
  );
}
function Projects() {
  return (
    <>
      <Header title="Selected projects" kicker="WORK" />
      <div className="project-cards">
        {projects.map((p, i) => (
          <article className="card project-card" key={p.id}>
            <div className="project-number">0{i + 1}</div>
            <h2>{p.title}</h2>
            <small>{p.category}</small>
            <p>{p.description}</p>
            <div className="tags">
              {p.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <p className="impact">
              <b>Impact:</b> {p.impact}
            </p>
            <div className="card-actions">
              <a href={p.github}>
                GitHub <ExternalLink size={14} />
              </a>
              <a href={p.demo}>
                Demo <ArrowUpRight size={14} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
function Skills() {
  return (
    <>
      <Header title="Skills & toolkit" kicker="CAPABILITIES" />
      <div className="skill-layout">
        <div>
          <h2>What I work with</h2>
          <div className="skills">
            {skills.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>Engineering mindset</h3>
          <p>
            Clean structure, clear naming, validation, automated tests, API
            contracts, Git collaboration and continuous learning.
          </p>
        </div>
      </div>
    </>
  );
}
function Experience() {
  return (
    <>
      <Header title="Experience" kicker="JOURNEY" />
      <div className="timeline">
        {experience.map((e, i) => (
          <div key={e.period}>
            <span>0{i + 1}</span>
            <div>
              <h2>{e.period}</h2>
              <p>{e.text}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <Header title="Let's talk" kicker="CONTACT" />
      <div className="contact-layout">
        <div>
          <h2>Have a project or opportunity?</h2>
          <p>
            Send me a message. The form is connected to your email service
            endpoint, so replace the endpoint in this page with Formspree,
            Web3Forms, or your own backend before publishing.
          </p>
          <div className="contact-direct">
            <a href={"mailto:" + profile.email}>
              Email me directly <ArrowUpRight size={16} />
            </a>
            <a href={"tel:" + profile.phone}>
              Call me <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <input required placeholder="Your name" />
          <input required type="email" placeholder="Your email" />
          <input placeholder="Subject" />
          <textarea required placeholder="Your message" />
          <button className="primary" type="submit">
            <Send size={16} /> {sent ? "Message ready" : "Send message"}
          </button>
          {sent && (
            <small className="success">
              <CheckCircle2 size={15} /> Connect this form to your email
              endpoint before launch.
            </small>
          )}
        </form>
      </div>
    </>
  );
}
function Header({ title, kicker }: { title: string; kicker: string }) {
  return (
    <header className="page-head">
      <p className="eyebrow">{kicker}</p>
      <h1>{title}</h1>
    </header>
  );
}
export default function App() {
  const [page, setPage] = useState("home");
  const content =
    page === "home" ? (
      <Home setPage={setPage} />
    ) : page === "about" ? (
      <About />
    ) : page === "projects" ? (
      <Projects />
    ) : page === "skills" ? (
      <Skills />
    ) : page === "experience" ? (
      <Experience />
    ) : (
      <Contact />
    );
  return (
    <div className="app">
      <Sidebar page={page} setPage={setPage} />
      <main>
        <div className="content">{content}</div>
        <Footer />
      </main>
      <a id="cv" href="#" hidden />
    </div>
  );
}
