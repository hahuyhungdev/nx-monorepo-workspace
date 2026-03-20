/**
 * apps/front-office — Thin app shell for SaaS platform.
 * Contains ZERO business logic. Only wires together domain libs.
 *
 * ✅ Correct imports (enforced by ESLint):
 *   @my-org/fe-auth     → auth hooks, provider, pages, UI
 *   @my-org/fe-billing  → billing hooks, provider, UI
 *   @my-org/fe-shared   → shared design system + pure helpers
 */
import { Route, Routes, Link } from 'react-router-dom';
import {
  AuthProvider,
  useAuth,
  ProtectedRoute,
  LoginPage,
  SignupForm,
} from '@my-org/fe-auth';
import { BillingProvider, useBilling, PricingCard } from '@my-org/fe-billing';
import { Button, Card, formatDate } from '@my-org/fe-shared';

// ─── Auth Pages ──────────────────────────────────────────

function SignupPage() {
  const { signup, isLoading, error } = useAuth();
  return <SignupForm onSubmit={signup} isLoading={isLoading} error={error} />;
}

// ─── Billing Page ────────────────────────────────────────

function BillingPage() {
  const { plans, subscription, subscribe } = useBilling();
  return (
    <div>
      <h1>Plans & Billing</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
        }}
      >
        {plans.map((plan) => (
          <PricingCard
            key={plan.id}
            name={plan.name}
            tier={plan.tier}
            price={plan.price}
            interval={plan.interval}
            features={plan.features}
            isCurrent={subscription?.planId === plan.id}
            onSelect={() => subscribe(plan.id, plan.interval)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Dashboard ───────────────────────────────────────────

function DashboardPage() {
  const { user, logout } = useAuth();
  const today = formatDate(new Date());

  return (
    <div>
      <Card title={`Welcome, ${user?.name ?? 'User'}`} subtitle={today}>
        <p>Role: {user?.role}</p>
        <Button label="Sign Out" onClick={logout} variant="secondary" />
      </Card>
      <nav style={{ marginTop: '1rem' }}>
        <Link to="/billing">Manage Billing →</Link>
      </nav>
    </div>
  );
}

// ─── App Shell ───────────────────────────────────────────

export function App() {
  return (
    <AuthProvider>
      <BillingProvider>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/billing"
            element={
              <ProtectedRoute>
                <BillingPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BillingProvider>
    </AuthProvider>
  );
}

export default App;
