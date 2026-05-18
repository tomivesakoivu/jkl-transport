# JKL Transport

This is an app to show Jyväskylä Bus stop schedules.

**Live app:** [https://jkl-transport-front-group-nine.onrender.com](https://jkl-transport-front-group-nine.onrender.com)

---

## About the project

The app is a browser app where the user can check up bus stop schedules in Jyväskylä. User can search for a specific buss stop for it's schedule. The app also shows service alerts provided by Waltti. 

---

## Features

<!-- List the main things a user can do. For example:
- Search for a bus stop by name
- View live departures for a stop
- See service alerts
- Data freshness indicator
-->
- Search for a bus stop by name
- View live departures for the searched stop
- Mattilanniemi is default when opening the app
- See service alerts and hide them
- Data freshness by indicator (on the top of the screen and refreshed text popup)

---

## Tech stack

| Part | Technology |
|------|-----------|
| Frontend | React, Vite |
| Backend | Node.js, Express |
| Data | GTFS Realtime (Waltti / Jyväskylä) |
| Hosting | Render.com |

---

## GTFS Realtime feeds used

<!-- Describe which feeds you use and what you do with each one.
- Trip updates — ...
- Service alerts — ...
-->

- Trip updates are used for the stops. 
- Service alrets are used for the service alerts.
- Static GTFS packages are used to match the stop and route ID:s to their name. The zip is cached.

Data source: [Waltti Open Data](https://opendata.waltti.fi/docs)

---

## Project structure

```
jkl-transport/
├── jkl-transport-back/
│   └── index.js                        # Express server, API proxy to Waltti GTFS-RT feeds
│
└── jkl-transport-front/
    └── src/
        ├── App.jsx                     # Root component, data fetching and state
        ├── main.jsx                    # React entry point
        ├── index.css                   # Global styles
        ├── components/
        │   ├── StopSearch.jsx          # Search input with live stop suggestions
        │   ├── StopDepartures.jsx      # Departure table for a selected stop
        │   ├── ServiceAlerts.jsx       # Collapsible service alert list
        │   └── TripUpdates.jsx         # (unused placeholder)
        ├── services/
        │   ├── api.js                  # API base URL from environment variable
        │   ├── stopsService.js         # Stop/route data fetching and caching
        │   └── stopsService.test.js    # Unit tests for stopsService
        └── utils/
            ├── departures.js           # Pure function for building departure list
            └── departures.test.js      # Unit tests for departure logic
```

---

## Running locally

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher (developed on v24)
- npm (comes with Node.js)
- Waltti API credentials — register at [opendata.waltti.fi](https://opendata.waltti.fi) to get a `CLIENT_ID` and `CLIENT_SECRET`

### Backend

```bash
cd jkl-transport-back
npm install
# Create a .env file with your Waltti API credentials:
# CLIENT_ID=your_client_id
# CLIENT_SECRET=your_client_secret
npm start
```

### Frontend

```bash
cd jkl-transport-front
npm install
npm run dev
```

---

## Environment variables

### Backend (`.env`)

| Variable | Description |
|----------|-------------|
| `CLIENT_ID` | Waltti API client ID |
| `CLIENT_SECRET` | Waltti API client secret |
| `PORT` | Port to run the server on (default: 3001) |

### Frontend (`.env.production`)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | URL of the deployed backend |

---

## Testing

```bash
cd jkl-transport-front
npx vitest
```

<!-- Briefly describe what is tested and why -->
Test are done for the departures.js and stopsService.js.
departures.js takes raw GTFS-RT data and turns it into a sorted list. 
The GTFS data can be imperfect, so it is good to be tested.

stopsService.js is the stop search feature. In the tests, the Axios is mocked. 
Search is the main user interaction of the app so it is propably good that it works certainly.

---

## Deployment

Both services are hosted on [Render.com](https://render.com) and deploy automatically from the `main` branch on GitHub.

### Backend — Web Service

| Setting | Value |
|---------|-------|
| Root directory | `jkl-transport-back` |
| Build command | `npm install` |
| Start command | `npm start` |
| Environment variables | `CLIENT_ID`, `CLIENT_SECRET` set in Render dashboard |

### Frontend — Static Site

| Setting | Value |
|---------|-------|
| Root directory | `jkl-transport-front` |
| Build command | `npm install && npm run build` |
| Publish directory | `dist` |
| Environment variables | `VITE_API_URL` set to the backend Render URL in `.env.production` |

The frontend is a static site built by Vite at deploy time. The `VITE_API_URL` value is baked into the bundle during the build, so it must point to the correct backend URL before deploying. The backend URL is `https://jkl-transport-group-nine.onrender.com`.

> **Note:** Render's free tier spins down idle services after 15 minutes of inactivity. The first request after a period of inactivity may take up to 30 seconds while the service starts back up.

---

## License

MIT
