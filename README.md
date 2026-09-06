# TaskFlow

TaskFlow is a full-stack task manager with user registration, JWT authentication,
personal task lists, a dashboard, and account settings.

## Tech stack

### Backend

- Java 17
- Spring Boot 4
- Spring Security
- Spring Data JPA
- PostgreSQL
- Flyway
- JWT (JJWT)
- Maven

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- Axios
- Zustand

## Requirements

Install the following before running the project:

- Java 17 or newer
- PostgreSQL
- Node.js and npm

The backend includes Maven Wrapper, so a separate Maven installation is not
required.

## Database setup

Create a PostgreSQL database for the application. For example:

```sql
CREATE DATABASE taskflow;
```

Flyway applies the database migrations automatically when the backend starts.
The migration files are located in:

```text
taskflow-b/src/main/resources/db/migration
```

## Backend configuration

The backend requires four environment variables:

| Variable | Example | Purpose |
| --- | --- | --- |
| `DB_URL` | `jdbc:postgresql://localhost:5432/taskflow` | PostgreSQL connection URL |
| `DB_USERNAME` | `postgres` | Database user |
| `DB_PASSWORD` | `your-password` | Database password |
| `JWT_SECRET` | a long random value | Key used to sign JWTs |

Generate a development JWT secret with:

```bash
openssl rand -base64 64
```

You can export the variables in a terminal:

```bash
export DB_URL="jdbc:postgresql://localhost:5432/taskflow"
export DB_USERNAME="postgres"
export DB_PASSWORD="your-password"
export JWT_SECRET="your-generated-secret"
```

Alternatively, add them to the environment variables in the IntelliJ run
configuration.

Do not commit real passwords or JWT secrets. Local environment files are
ignored by Git.

## Run the backend

From the project root:

```bash
cd taskflow-b
./mvnw spring-boot:run
```

The API starts at `http://localhost:8080/api`.

## Frontend configuration

Create the local frontend environment file from the tracked example:

```bash
cd taskflow-f
cp .env.example .env
```

The default development configuration is:

```env
VITE_API_URL=http://localhost:8080/api
```

Vite reads environment variables when the development server or production
build starts. Restart it after changing `.env`.

## Run the frontend

From `taskflow-f`:

```bash
npm install
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

## Checks and tests

Run backend tests:

```bash
cd taskflow-b
./mvnw test
```

Run frontend linting and create a production build:

```bash
cd taskflow-f
npm run lint
npm run build
```

## Main API routes

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/api/register` | Create an account |
| `POST` | `/api/login` | Sign in |
| `POST` | `/api/refresh` | Refresh the access token |
| `GET` | `/api/task` | Get the current user's tasks |
| `POST` | `/api/task` | Create a task |
| `PATCH` | `/api/task/{id}` | Update a task |
| `DELETE` | `/api/task/{id}` | Delete a task |
| `GET` | `/api/account` | Get account information |
| `PATCH` | `/api/account` | Update name or email |
| `POST` | `/api/account` | Change password |
| `DELETE` | `/api/account` | Delete the account and its tasks |

Task and account routes require an access token in the request header:

```http
Authorization: Bearer <access-token>
```

## Project structure

```text
TaskFlow/
├── taskflow-b/   Spring Boot backend
└── taskflow-f/   React frontend
```
