# DigBurn — Interactive Waste-to-Energy Plant Demo

An early-stage, **scroll-driven visual concept demonstration** for DigBurn, exploring how an industrial waste-to-energy facility could be presented through interactive engineering storytelling.

> **Project status:** Prototype / demonstration only. The illustrations are conceptual, not verified engineering drawings; this version does not perform combustion, CFD, heat-transfer, fouling, or corrosion calculations.

## 1. Purpose

The demo illustrates a potential visual interface for DigBurn, an envisioned software platform combining industrial sensor data, physics-based modelling, and data analysis to support understanding of waste-to-energy plant operations, including combustion, boiler heat transfer, fouling, and corrosion.

The immediate goal is to communicate the user experience to collaborators and gather feedback **before** investing in detailed industrial artwork, simulation integration, or production development.

## 2. What the current demo does

The page displays a sequence of five industrial illustrations. The central visual stays pinned while the visitor scrolls. GSAP ScrollTrigger uses scroll progress to crossfade between scenes and animate their accompanying captions.

| Scene | View | Storytelling goal |
| --- | --- | --- |
| 1 | Full plant exterior | Introduce the facility without showing internal equipment |
| 2 | Exterior section opened | Reveal where the enclosed combustion equipment is located |
| 3 | Close-up of closed furnace | Focus attention on the combustion system before opening it |
| 4 | Furnace cutaway | Show combustion and heat-transfer equipment |
| 5 | Annotated process cutaway | Explain the waste feed, combustion chamber, grate, boiler tubes, bottom ash, and flue-gas route |

The current transitions use **image opacity and scale**. They do not physically move individual panels or simulate gas flow. The images may differ in framing, so transitions are not yet perfectly geometrically aligned.

## 3. Technology stack

- **React** — component-based user interface written in JSX.
- **Vite** — local development server and production bundler.
- **JavaScript and CSS** — page structure, layout, typography, and responsive styling.
- **GSAP + ScrollTrigger** — scroll-linked timeline, pinning, crossfades, and caption animations.
- **Static JPEG illustrations** — the five visual states, served from `public/images/`.
- **ESLint** — development-time code linting.

The initial development machine used **Ubuntu 22.04 Jammy**, with Node.js and npm installed using **NVM** to avoid system-wide package changes. The initial setup used Node.js **v26.13.0**, npm **11.20.0**, and Vite **8.3.5**. These versions document the original setup; other supported versions may also work.

## 4. Project structure

```text
digburn-demo/
├── public/
│   └── images/
│       ├── figure-1.jpg
│       ├── figure-2.jpg
│       ├── figure-3.jpg
│       ├── figure-4.jpg
│       └── figure-5.jpg
├── src/
│   ├── App.jsx          # Page, scene metadata, GSAP timeline
│   ├── App.css          # Layout, overlays, typography, responsive styling
│   ├── index.css        # Global styles
│   └── main.jsx         # React entry point
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

**Image path rule:** A file stored as `public/images/figure-1.jpg` is referenced in JSX as `/images/figure-1.jpg`. Do not use `/public/images/figure-1.jpg` in the browser URL. File names are case-sensitive on Linux.

## 5. Requirements and local setup

Install a Node.js version supported by the project's current Vite and React dependencies. NVM is recommended for development machines because it keeps Node.js versions in the user's home directory rather than installing system-wide.

Clone the repository and install the locked dependencies:

```bash
git clone <REPOSITORY_URL>
cd digburn-demo
npm ci
```

Start the development server:

```bash
npm run dev
```

Open the local address printed by Vite, usually:

```text
http://localhost:5173/
```

Stop the server with `Ctrl+C`.

### Other useful commands

```bash
npm run lint       # Run ESLint checks
npm run build      # Create a production bundle in dist/
npm run preview    # Preview the built site locally
npm audit          # Inspect known dependency advisories
```

`npm ci` uses `package-lock.json` to install reproducible dependencies. `node_modules/` and `dist/` should not be committed.

## 6. How the animation works

1. `src/App.jsx` defines an ordered `scenes` array, each with an image path, title, and description.
2. React renders the images in overlapping, absolutely positioned layers.
3. GSAP sets the initial state: the first image and caption are visible; subsequent layers are hidden.
4. ScrollTrigger pins the main visualization to the viewport for the storytelling interval.
5. A GSAP timeline transitions the active image and caption as the user scrolls.
6. The bottom progress bar reflects progress through the pinned animation.
7. After the five scenes, the visitor reaches a concluding DigBurn concept section.

Scrolling backward reverses the timeline. In this version, the effect is a **scroll-controlled slideshow with transitions**, not a physically continuous camera animation.

## 7. Current limitations

- Illustrations are conceptual and may not accurately represent a specific incineration plant design.
- Some figures have different crops or camera framing; crossfades can look like visual jumps.
- The last scene's labelled illustration may not align pixel-for-pixel with the preceding cutaway.
- No live CFD, sensor data, heat-transfer predictions, or fouling/corrosion model is connected.
- The process visuals are static JPEGs; individual components cannot yet be independently animated.
- Desktop layout is the main demonstration target. Mobile experience needs further testing.
- The project is not yet deployed as a publicly accessible site.

## 8. Next development milestones

1. **Team review:** Share a short screen recording and gather feedback on the five-scene story.
2. **Visual alignment:** Standardize the aspect ratio, framing, and equipment locations between scenes.
3. **Improved transitions:** Use transparent PNG layers or SVG masks to remove cladding and furnace panels more convincingly.
4. **Process animation:** Add subtle flame, gas-flow, and heat-transfer overlays.
5. **Interactive engineering concept:** Introduce a conceptual fouling-risk or temperature visualization with clearly labelled illustrative parameters.
6. **Technical validation:** Review the schematic and process labels with domain experts before using it externally.
7. **Deployment:** Publish a review version with appropriate access controls.

## 9. Security and dependency notes

During initial setup, `npm audit` reported **six moderate findings** associated with the ESLint dependency tree and `minimatch@10.2.6`. The report identified a glob-pattern denial-of-service advisory and, at the time, indicated no compatible fix was available. This does **not** establish that GSAP is vulnerable or that the website was compromised.

Before deployment, rerun:

```bash
npm audit
npm ls minimatch eslint @eslint/config-array
```

Review current advisories and compatible upgrades. **Do not automatically run `npm audit fix --force`**, as forced major-version changes can break the project. Keep the development server bound to localhost unless remote access is intentionally configured.

Never commit credentials, tokens, `.env` files containing secrets, `node_modules/`, or generated build files.

## 10. Screen recording and sharing

A short recording of the local website can be made using Ubuntu's built-in screen recorder. A recording is useful for feedback, but **a video is not a substitute for the interactive site**. For collaborators to interact with the scrolling page, they can run it locally or access a future deployed preview.

For a private GitHub repository, invite collaborators under **Settings → Collaborators and teams** (wording may vary with repository type and GitHub UI).

## 11. Acknowledgement and usage

This repository is an exploratory team prototype. Confirm rights and permissions for all generated or externally sourced artwork before public release. Do not present the conceptual visuals as engineering-validated outputs.

No software license has been selected for this repository. A private repository does not automatically grant redistribution rights; choose a license deliberately if the team later makes it public.
