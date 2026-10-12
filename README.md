# System Sylvere Barinda — Premium Portfolio V2

A two-panel, recruiter-focused portfolio built with **React + TypeScript + Vite + Tailwind CSS v4**.

## Features
- Fixed desktop two-panel layout: navigation on the left, the selected section on the right (the content panel scrolls internally when needed).
- Shareable section URLs via hash (`/#projects`, `/#contact`, ...).
- Responsive mobile navigation drawer.
- Sections: Overview (hero), About, Skills (grouped), Projects (3 case-study cards with previews), Experience & achievements, Certificates & awards, Contact.
- All content lives in `src/data/portfolio.ts`; reusable UI lives in `src/components/ui/`.
- Contact form with client-side validation, EmailJS delivery, and a `mailto:` fallback.
- Tailwind CSS v4 through `@tailwindcss/vite` — no component CSS files.

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
Edit `src/data/portfolio.ts`:
- `profile.linkedin` — your LinkedIn profile URL
- `projects[].github` / `projects[].demo` — repo and live demo links (cards show "Demo coming soon" when `demo` is empty)
- `projects[].image` — replace the SVG previews in `public/images/projects/` with real screenshots

Your CV is `public/System_Sylvere_Barinda_Software_Engineer_CV.pdf`, linked from `profile.cvUrl` (header, sidebar, hero and footer buttons). To update it, replace that file with a PDF of the same name, or change `profile.cvUrl` and `profile.cvFileName`.

## Certificates, awards & photos
The Certificates section lists items from `src/data/certificates.json` with category filters (Certificates, Awards, Education, Photos), a full-screen viewer and a download button for each item.

**Add an item (local only):**
1. Run `npm run dev` and open `/#certificates`.
2. Click **Add certificate**, choose a JPG, PNG, WEBP or PDF (max 10 MB) and fill in the details.
3. The file is saved to `public/certificates/` and the entry is added to `src/data/certificates.json`. Commit both to publish.

The upload and delete buttons only appear on the dev server; the deployed site is view and download only. You can also edit `certificates.json` by hand — leave out `file` to show a "coming soon" card.

## Contact form (EmailJS)
1. Create a service and template at https://dashboard.emailjs.com. The template receives `from_name`, `reply_to`, `subject` and `message`.
2. Copy `.env.example` to `.env` and fill in `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` and `VITE_EMAILJS_PUBLIC_KEY`.
3. Restart `npm run dev`.

Without these variables the form still validates input and opens the visitor's email client with the message pre-filled.
