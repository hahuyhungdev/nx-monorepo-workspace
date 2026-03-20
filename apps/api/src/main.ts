/**
 * apps/api — Thin Express server.
 * Only wires together routes; business logic lives in libs.
 *
 * ✅ Correct imports:
 *   import { ... } from '@my-org/utils';  // shared types/helpers
 */
import express from 'express';
import type { ApiResponse } from '@my-org/utils';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(express.json());

// Example: thin route handler using shared types
app.get('/api/users', (_req, res) => {
  const response: ApiResponse<{ id: string; name: string; email: string }[]> = {
    data: [
      { id: '1', name: 'alice', email: 'alice@example.com' },
      { id: '2', name: 'bob', email: 'bob@example.com' },
    ],
    message: 'Users fetched successfully',
    success: true,
  };
  res.json(response);
});

app.get('/api/users/:id', (req, res) => {
  const response: ApiResponse<{ id: string; name: string; email: string }> = {
    data: { id: req.params.id, name: 'alice', email: 'alice@example.com' },
    message: 'User fetched successfully',
    success: true,
  };
  res.json(response);
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
