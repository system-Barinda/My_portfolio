export const profile = {
  name: "System Sylvere Barinda",
  firstName: "System",
  initials: "SB",
  role: "Software Engineer",
  location: "Rwanda",
  email: "systembarinda@gmail.com",
  phone: "+250 786 885 060",
  availability: "Open to opportunities",
  registration: "24RP08563",
  education: "Information Technology — RP-Tumba College",
  headline: "I build modern web applications and reliable backend systems.",
  summary:
    "Software engineer focused on React + TypeScript interfaces and Java / Spring Boot APIs. I care about clean architecture, validated data, tested code and products that people actually enjoy using.",
  photo: "/images/system.jpg",
  cvUrl: "/cv.pdf",
  github: "https://github.com/system-Barinda",
  linkedin: "https://www.linkedin.com/",
};

export const about = {
  paragraphs: [
    "I am a third-year Information Technology student at RP-Tumba College with a strong focus on software engineering. My journey started at TSS-Mutovu, where I first learned to build software, and continued through hands-on software engineering training at TheGym Rwanda.",
    "I enjoy breaking down real-world problems into clear, testable pieces — designing the data model, building secure APIs, and shipping responsive interfaces on top of them. I believe good engineering is about understanding the problem first, then choosing the simplest solution that is easy to maintain.",
    "My goal is to grow into a well-rounded software engineer who builds scalable, secure products and contributes to teams that ship meaningful work across Rwanda and beyond.",
  ],
  strengths: [
    {
      title: "Problem solving",
      text: "I break complex requirements into small, testable steps and debug methodically.",
    },
    {
      title: "Teamwork",
      text: "Experienced in group projects using Git workflows, code reviews and clear communication.",
    },
    {
      title: "Clean code",
      text: "Readable structure, validation, automated tests and sensible abstractions.",
    },
    {
      title: "Career goal",
      text: "Grow as a full-stack engineer building secure, scalable products for real users.",
    },
  ],
};

export type SkillGroup = {
  id: "frontend" | "backend" | "databases" | "tools";
  title: string;
  description: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Responsive, accessible and typed user interfaces.",
    items: ["React", "TypeScript", "Vite", "Tailwind CSS", "Redux", "Zustand"],
  },
  {
    id: "backend",
    title: "Backend",
    description: "Secure APIs and server-side business logic.",
    items: ["Java", "Spring Boot", "Servlets", "JSP", "JDBC", "RESTful APIs"],
  },
  {
    id: "databases",
    title: "Databases",
    description: "Relational and document data modelling.",
    items: ["MySQL", "PostgreSQL", "MongoDB"],
  },
  {
    id: "tools",
    title: "Tools & DevOps",
    description: "Version control, automation, testing and deployment.",
    items: ["Git", "GitHub Actions", "Docker", "Linux (Ubuntu Server)", "Jest"],
  },
];

export type Project = {
  id: string;
  number: string;
  title: string;
  type: string;
  description: string;
  challenges: string[];
  stack: string[];
  image: string;
  github: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    id: "car-sharing",
    number: "01",
    title: "Car-Sharing Platform",
    type: "Full-stack booking system",
    description:
      "A car-sharing platform where users browse available cars and book them for a time slot. I owned the backend booking endpoints and the integration test suite.",
    challenges: [
      "Designed REST booking endpoints with overlap checks to prevent double-booking",
      "Implemented request validation and consistent error responses",
      "Wrote integration tests covering booking, cancellation and edge cases",
    ],
    stack: ["Spring Boot", "Java", "React", "PostgreSQL", "JUnit"],
    image: "/images/projects/car-sharing.svg",
    github: "https://github.com/system-Barinda",
  },
  {
    id: "inventory",
    number: "02",
    title: "Offline Inventory Management System",
    type: "Desktop equipment tracker · Airtel",
    description:
      "An offline-first desktop application for tracking Airtel end-user equipment — registering devices, assigning them to employees, and managing issue / return workflows.",
    challenges: [
      "Works fully offline with a local database for field use",
      "Clear issue / return history so every device is accountable",
      "Responsive frontend that stays fast with large equipment lists",
    ],
    stack: ["Spring Boot", "Java", "MySQL", "Tailwind CSS"],
    image: "/images/projects/inventory.svg",
    github: "https://github.com/system-Barinda/Device-Inventory-System",
  },
  {
    id: "ecommerce-sessions",
    number: "03",
    title: "E-Commerce Session Management",
    type: "Academic group project",
    description:
      "The session management module of a group e-commerce platform, handling login state, carts and protected user workflows securely across requests.",
    challenges: [
      "Secure session creation, timeout and invalidation on logout",
      "Protected routes with filters so only authenticated users check out",
      "Coordinated module boundaries and merges with teammates via Git",
    ],
    stack: ["Java", "Servlets", "JSP", "JDBC", "MySQL"],
    image: "/images/projects/ecommerce.svg",
    github: "https://github.com/system-Barinda/E-Commerce-Platform",
  },
];

export type ExperienceItem = {
  period: string;
  title: string;
  organization: string;
  detail: string;
};

export const experience: ExperienceItem[] = [
  {
    period: "Training",
    title: "Software Engineering Training",
    organization: "TheGym Rwanda",
    detail:
      "Hands-on training in backend and frontend development, API design, authentication, automated testing, Git workflows and professional delivery.",
  },
  {
    period: "Academic",
    title: "Academic Group Projects",
    organization: "RP-Tumba College",
    detail:
      "Delivered team projects such as an e-commerce platform, splitting modules, reviewing each other's code and presenting the final systems.",
  },
  {
    period: "Education",
    title: "Information Technology — Year 3",
    organization: "RP-Tumba College",
    detail:
      "Building a strong foundation in software engineering, databases, networking and system design alongside practical projects.",
  },
];

export const achievements = [
  {
    title: "System Architecture",
    text: "Coursework on layered architecture, MVC, client-server design and designing maintainable systems.",
  },
  {
    title: "Advanced Workplace English",
    text: "Professional communication: technical writing, presentations and collaborating in English-speaking teams.",
  },
  {
    title: "Software Development Foundations",
    text: "Started at TSS-Mutovu, learning programming fundamentals and building first applications.",
  },
];
