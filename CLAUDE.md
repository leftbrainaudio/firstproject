# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```

## Architecture

Next.js 14 App Router SaaS prototype for building design systems ("DesignBase").

**Auth** — `lib/auth.tsx` provides an `AuthProvider` (React context) and `useAuth()` hook. Auth state is stored in `localStorage` (prototype-grade; no backend). The dashboard layout redirects unauthenticated users to `/login`.

**Routes:**
- `/` — marketing landing page (server component)
- `/login`, `/signup` — client components using `useAuth()`
- `/dashboard` — overview with stats and activity feed
- `/dashboard/tokens` — full design token editor (color/typography/spacing) with add, edit, delete, and CSS export
- Dashboard routes share `app/dashboard/layout.tsx` which renders the sidebar and enforces auth

**Token editor** (`app/dashboard/tokens/page.tsx`) — all state is local (`useState`); no persistence beyond the session. Exports tokens as a CSS custom properties file.
