# Portfolio CMS — Frontend

Public-facing portfolio site, built in React (Vite) + Tailwind CSS. Fetches
all content dynamically from the custom CMS backend — nothing is
hardcoded, so updating content through the admin panel reflects here
immediately with no redeploy.

## Tech Stack
- React 18 (Vite)
- Tailwind CSS v4
- React Router
- Axios

## Pages
Home, About, Projects, Skills, Experience, Blog, Contact — each fetches
its own data from the backend on load.

## Running Locally

```bash
npm install
npm run dev
```

Requires the backend running (see `portfolio-cms-backend`) and a `.env`
file (copy `.env.example` and fill in):

VITE_API_BASE_URL=http://localhost:8080


## Building for Production

```bash
npm run build
```

Outputs to `dist/`.

## Deployment
Deployed on [Vercel — https://portfolio-cms-frontend-ablj.vercel.app/]. `VITE_API_BASE_URL` is
set in the hosting platform's environment variable settings to point at
the deployed backend.

## Related Repos
- Backend + CMS API: `portfolio-cms-backend`
- Admin panel: `portfolio-cms-admin`
