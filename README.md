# cohort-9-mern-11191-subaina
Cohort 9 — MERN (NodeJS+ReactJS) assignment for Subaina Munib


cohort-9-mern-11191-subaina
Cohort 9 MERN (NodeJS+ReactJS) assignment for Subaina Munib.

A notes application with user accounts and a rich text editor, built on the MERN stack.

Repository layout
notes-app/
  backend/    Express + MongoDB REST API
  frontend/   React (Vite) single page app
.github/workflows/build.yml   CI: run tests, then SonarCloud scan
sonar-project.properties      SonarCloud configuration
notes-app/sonarcubeReport/   Screenshots of the SonarCloud analysis
Backend (notes-app/backend)
Express API using Mongoose for MongoDB. Structure follows a layered pattern: routes to controllers to services to repositories to models. JWT auth via an authMiddleware, request validation with express-validator, and centralized error handling.

Endpoints:

POST /api/auth/signup, POST /api/auth/login, GET /api/auth/me, POST /api/auth/logout
GET|POST /api/notes, GET|PUT|DELETE /api/notes/:id (all require a valid token)
GET /api/health
Run it:

cd notes-app/backend
npm install
cp .env.example .env   # then fill in MONGO_URI and JWT_SECRET
npm run dev
Tests use Mocha, Chai, and Sinon (Mongoose is mocked, so no database is needed):

npm test                # runs the suite with nyc coverage
Frontend (notes-app/frontend)
React 19 with Vite, React Router, Axios for API calls, and react-quill-new for the editor. Auth state lives in a React context. Styling is plain CSS per component under src/styles.

Run it:

cd notes-app/frontend
npm install
npm run dev             # serves on http://localhost:5173
Tests use Jest with Testing Library:

npm test                # runs the suite with coverage
Code Quality: SonarCloud
This project is analyzed on every push to main via SonarCloud, integrated through a GitHub Actions workflow (.github/workflows/build.yml).

What the pipeline does:

Runs the backend test suite (Mocha/Chai) with coverage via nyc
Runs the frontend test suite (Jest) with coverage
Uploads both lcov.info reports to SonarCloud for combined analysis
Current results:

Metric	Status
Security Rating	A
Open Issues	0
Duplications	0.0%
Code Coverage	~28%
Quality Gate	Failed (coverage threshold only)
On the failed Quality Gate: the only failing condition is the default "Sonar way" gate's requirement of at least 80% coverage on new code. All security, reliability, and maintainability issues originally flagged (7 total, including SQL/NoSQL injection risks, unconfigured CORS, an unsafe regex, and an accessibility issue) have been fixed and verified. See the commit history for details. The coverage gap reflects real, honest test coverage rather than an inflated number. Several files (for example AuthContext.jsx and NoteEditor.jsx) have partial or no coverage and would be the next priority for additional tests.

Screenshots of the full analysis are available in notes-app/sonarcubeReport/.