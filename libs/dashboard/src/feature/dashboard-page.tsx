import { Card } from '@my-org/shared/ui';
import { formatDate } from '@my-org/shared/util';

interface DashboardPageProps {
  userName?: string;
  userRole?: string;
  onSignOut?: () => void;
}

export function DashboardPage({
  userName = 'User',
  userRole = 'member',
  onSignOut,
}: DashboardPageProps) {
  const today = formatDate(new Date());

  return (
    <div>
      <Card title={`Welcome, ${userName}`} subtitle={today}>
        <p>Role: {userRole}</p>
        {onSignOut && (
          <button onClick={onSignOut} style={{ marginTop: '0.5rem' }}>
            Sign Out
          </button>
        )}
      </Card>
    </div>
  );
}
