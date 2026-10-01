# Meagan Jenkins: About Me

An interactive, trail-guide-style About Me page built with Vite, React and TypeScript. The header is an altimeter that climbs from Denver (5,280 ft) to a summit as you scroll, and each section is a waypoint.

## Run it

```bash
npm install
npm run dev      # http://localhost:47213
npm run build    # type-check and production build
npm run lint
```

## Pages (hash routes, so any static host works)

- `#/` Home: headline, results at a glance, featured case studies
- `#/work` Work: tabs for Case studies, eLearning, Videos and Guides (old Wix names like `#/elearning` also work)
- `#/tech-stack` Tech stack
- `#/about` About: photo carousel, trail-sign hobbies, campfire, ask-me-anything, career route
- Tree scavenger hunt: 8 hidden trees across the site, counter in the corner, progress saved in the browser
- Trail mode and Spooky mode (`?theme=spooky`), and it honors `prefers-reduced-motion`

## Make changes

All page copy, case studies, courses, videos (add a Vimeo ID), guides, tech stack, career history, hobbies and Q&A live in [`src/content.ts`](src/content.ts). Wrap a word in `*asterisks*` there to show it in the accent color. Photos live in `public/photos/` and are listed in the `slides` array. Colors are CSS variables at the top of `src/index.css`.
