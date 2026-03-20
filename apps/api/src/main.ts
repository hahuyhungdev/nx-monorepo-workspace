/**
 * apps/api — Thin Express server for SaaS platform.
 * Route handlers delegate to lib functions; no business logic here.
 *
 * ✅ Correct imports:
 *   @my-org/shared/util  → shared types (ApiResponse, formatDate)
 */
import express from 'express';
import type { ApiResponse } from '@my-org/shared/util';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(express.json());

// ─── CORS Configuration ──────────────────────────────────

const allowedOrigins = ['http://localhost:4200', 'http://localhost:4300'];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// ─── Health Check ────────────────────────────────────────

app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// ─── Auth Routes ─────────────────────────────────────────

app.post('/api/auth/login', (_req, res) => {
  const response: ApiResponse<{
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  }> = {
    data: {
      accessToken: 'tok_abc',
      refreshToken: 'ref_xyz',
      expiresAt: Date.now() + 3600000,
    },
    message: 'Login successful',
    success: true,
  };
  res.json(response);
});

app.post('/api/auth/signup', (_req, res) => {
  const response: ApiResponse<{
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  }> = {
    data: {
      accessToken: 'tok_new',
      refreshToken: 'ref_new',
      expiresAt: Date.now() + 3600000,
    },
    message: 'Signup successful',
    success: true,
  };
  res.json(response);
});

app.post('/api/auth/logout', (_req, res) => {
  res.json({ data: null, message: 'Logged out', success: true });
});

app.get('/api/auth/me', (_req, res) => {
  const response: ApiResponse<{
    id: string;
    email: string;
    name: string;
    role: string;
  }> = {
    data: { id: '1', email: 'alice@example.com', name: 'Alice', role: 'admin' },
    message: 'OK',
    success: true,
  };
  res.json(response);
});

// ─── Billing Routes ──────────────────────────────────────

app.get('/api/billing/plans', (_req, res) => {
  const response: ApiResponse<unknown[]> = {
    data: [
      {
        id: 'free',
        name: 'Free',
        tier: 'free',
        price: 0,
        interval: 'monthly',
        features: ['1 project', '100 API calls/day'],
      },
      {
        id: 'starter',
        name: 'Starter',
        tier: 'starter',
        price: 19,
        interval: 'monthly',
        features: ['5 projects', '10k API calls/day', 'Email support'],
      },
      {
        id: 'pro',
        name: 'Pro',
        tier: 'pro',
        price: 49,
        interval: 'monthly',
        features: [
          'Unlimited projects',
          '100k API calls/day',
          'Priority support',
          'Analytics',
        ],
      },
    ],
    message: 'Plans fetched',
    success: true,
  };
  res.json(response);
});

app.get('/api/billing/subscription', (_req, res) => {
  res.json({ data: null, message: 'No subscription', success: true });
});

app.post('/api/billing/subscribe', (_req, res) => {
  res.json({
    data: {
      id: 'sub_1',
      planId: 'starter',
      status: 'active',
      currentPeriodEnd: '2026-04-20',
      cancelAtPeriodEnd: false,
    },
    message: 'Subscribed',
    success: true,
  });
});

app.post('/api/billing/cancel', (_req, res) => {
  res.json({
    data: {
      id: 'sub_1',
      planId: 'starter',
      status: 'canceled',
      currentPeriodEnd: '2026-04-20',
      cancelAtPeriodEnd: true,
    },
    message: 'Subscription canceled',
    success: true,
  });
});

app.get('/api/billing/invoices', (_req, res) => {
  res.json({ data: [], message: 'No invoices', success: true });
});

// ─── User Routes (existing) ─────────────────────────────

app.get('/api/users', (_req, res) => {
  res.json({
    data: [
      { id: '1', name: 'alice', email: 'alice@example.com' },
      { id: '2', name: 'bob', email: 'bob@example.com' },
    ],
    message: 'Users fetched',
    success: true,
  });
});

// ─── Start Server ────────────────────────────────────────

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
