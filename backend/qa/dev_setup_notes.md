# Dev Setup Notes — Backend Stack & DB Connection

**Stack:** Node.js + Express + mysql2 + dotenv

## How to run
1. `cp .env.example .env` and fill DB creds.
2. `npm install`
3. `npm run dev`
4. Verify:
   - Open `http://localhost:3000/health` → `OK`
   - Open `http://localhost:3000/db/ping` → `{ "status": "connected", "result": { "ok": 1 } }`

### Console proof (sample)