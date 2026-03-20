/**
 * apps/web — Thin app shell for SaaS platform.
 * Contains ZERO business logic. Only wires together:
 *   - Feature libs (auth, billing, generic features)
 *   - UI libs (auth forms, billing cards, shared components)
 *   - Shared utils
 *
 * ✅ Correct imports (enforced by ESLint):
 *   @my-org/feature-auth     → auth hooks & provider
 *   @my-org/feature-billing   → billing hooks & provider
 *   @my-org/ui-auth           → auth UI components
 *   @my-org/ui-billing        → billing UI components
 *   @my-org/ui                → shared design system
 *   @my-org/utils             → pure helpers
 */
import { Route, Routes, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@my-org/feature-auth';
import { BillingProvider, useBilling } from '@my-org/feature-billing';
import { LoginForm, SignupForm } from '@my-org/ui-auth';
import { PricingCard } from '@my-org/ui-billing';
import { Button, Card } from '@my-org/ui';
import { formatDate } from '@my-org/utils';

// ─── Auth Pages (thin — delegates to feature + ui libs) ──

function LoginPage() {
  const { login, isLoading, error } = useAuth();
  return <LoginForm onSubmit={login} isLoading={isLoading} error={error} />;
}

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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
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

// ─── Route Guard ─────────────────────────────────────────

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div>Loading…</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
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
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            }
          />
          <Route
            path="/billing"
            element={
              <RequireAuth>
                <BillingPage />
              </RequireAuth>
            }
          />
        </Routes>
      </BillingProvider>
    </AuthProvider>
  );
}

export default App;

