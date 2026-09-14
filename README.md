# System Sylvere Barinda — Premium Portfolio V2

A two-panel, recruiter-focused portfolio built with **React + TypeScript + Vite + Tailwind CSS v4**.

## Features
- Fixed desktop two-panel layout: navigation on the left, selected content on the right.
- No desktop page scrolling; each section is designed to fit the viewport.
- Responsive mobile navigation.
- Blue, white and black visual system only.
- About, Projects, Experience, Skills and Contact sections.
- Two project case studies: Road Master and MoniShare.
- Two professional reference/testimonial cards.
- Centralized editable portfolio data in `src/data/portfolio.ts`.
- Tailwind CSS v4 through `@tailwindcss/vite` — no traditional component CSS files.

## Run
Requires Node.js 20+ recommended.

```bash
npm install
npm run dev
```

Open the local Vite URL, normally `http://localhost:5173`.

## Production check

```bash
npm run build
npm run preview
```

## Personalize before publishing
Edit `src/data/portfolio.ts` and replace:
- email
- phone
- GitHub URL
- LinkedIn URL
- project GitHub/demo URLs
- project descriptions if needed
- testimonial names/roles

Replace the `SB` initials block with your real profile photo when you have it.

## Receiving contact messages
The UI is ready, but a browser-only React app cannot securely deliver email by itself. Connect the form to a service such as Formspree, Web3Forms, or your own backend/API.

The submit handler is deliberately local in this starter so the project runs immediately without a fake or broken endpoint. Once you have your endpoint, replace the `submit` handler in `src/App.tsx` with a `fetch()` POST to that endpoint.
