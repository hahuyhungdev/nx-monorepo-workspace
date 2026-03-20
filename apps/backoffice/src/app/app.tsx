/**
 * apps/backoffice — Internal admin dashboard.
 * Thin shell — composes feature/ui/shared libs only.
 */
import { Route, Routes, Link } from 'react-router-dom';
import { Button, Card } from '@my-org/shared/ui';
import { formatDate } from '@my-org/shared/util';

// ─── Dashboard ───────────────────────────────────────────

function DashboardPage() {
  const today = formatDate(new Date());

  return (
    <div>
      <Card title="Backoffice Dashboard" subtitle={today}>
        <p>Role: admin</p>
        <nav style={{ display: 'flex', gap: '0.5rem', margin: '1rem 0' }}>
          <Link to="/users">Users</Link>
          <Link to="/billing">Billing</Link>
        </nav>
        <Button label="Sign Out" onClick={() => alert('Sign out')} variant="secondary" />
      </Card>
    </div>
  );
}

// ─── Placeholder pages ──────────────────────────────────

function UsersPage() {
  return (
    <Card title="User Management">
      <p>User list goes here.</p>
      <Link to="/">Back to Dashboard</Link>
    </Card>
  );
}

function BillingAdminPage() {
  return (
    <Card title="Billing Admin">
      <p>Subscription & invoice management goes here.</p>
      <Link to="/">Back to Dashboard</Link>
    </Card>
  );
}

// ─── App Shell ───────────────────────────────────────────

export function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/billing" element={<BillingAdminPage />} />
    </Routes>
  );
}

export default App;
