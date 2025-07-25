# Task-Manager-API-Backend-Intern-Project

## Project Structure

```plaintext
project-root/
├─ src/
│  ├─ app.ts                 # create express app, register middlewares
│  ├─ server.ts              # start server (reads PORT)
│  ├─ config/
│  │  └─ index.ts            # env vars, config object
│  ├─ models/
│  │  └─ task.model.ts
│  ├─ schemas/               # zod/joi validation schemas
│  │  └─ task.schema.ts
│  ├─ services/
│  │  └─ task.service.ts     # DB interactions
│  ├─ controllers/
│  │  └─ task.controller.ts  # req/res logic
│  ├─ routes/
│  │  └─ task.routes.ts
│  ├─ middleware/
│  │  ├─ errorHandler.ts
│  │  └─ notFound.ts
│  ├─ utils/
│  │  ├─ asyncHandler.ts
│  │  └─ logger.ts
│  └─ types/
│     └─ index.d.ts
├─ tests/
│  ├─ task.e2e.test.ts
│  └─ task.unit.test.ts
├─ package.json
├─ tsconfig.json
├─ jest.config.js
├─ .env.example
└─ README.md
```