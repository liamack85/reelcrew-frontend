# ReelCrew

A group movie coordination app. Create a watch group, assign a film, set a deadline — members track who has watched it and who hasn't.

## Overview

ReelCrew solves the problem of coordinating movie nights with friends across different schedules. Users can browse films, build a personal watchlist, join watch groups, and track progress together toward a shared deadline.

## Features

- Browse and search films via the OMDB API
- Personal watchlist with watched/want-to-watch tracking
- Create and join watch groups with a host-managed film queue
- Lazy authentication — browse freely, auth only triggered at point of action
- Dark and light mode with OS preference detection

## Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Client   | React 19, React Router 7, Vite      |
| UI       | MUI (Material UI) v7                |
| Auth     | JWT via AuthContext, sessionStorage |
| Film API | OMDB API                            |
| Server   | Node/Express (separate repo)        |
| Database | PostgreSQL                          |

## Setup

1. Clone the repo
2. Copy `example.env` to `.env` and set `VITE_API` to your server URL
3. Run `npm install`
4. Run `npm run dev` — client runs on port 5173

## Folder Structure

- `src/auth/` — AuthContext, login/register forms, auth modal
- `src/layout/` — Sidebar, TopBar, Avatar, Layout wrapper
- `src/films/` — Film search, film cards, film detail page
- `src/groups/` — Watch groups list, group detail, group form
- `src/profile/` — Profile page, stats, recently watched
- `src/userWatchlist/` — Full watchlist/watched history page
- `src/watches/` — Watch coordination, member progress list
- `src/api/` — Fetch functions for each server resource
- `src/theme.jsx` — MUI theme with dark/light mode

## Related

- [ReelCrew Server](https://github.com/liamack85/reelcrew-backend)
