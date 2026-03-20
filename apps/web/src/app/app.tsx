/**
 * apps/web — Thin app shell.
 * Only wires together libs; contains NO business logic.
 *
 * ✅ Correct imports:
 *   import { ... } from '@my-org/feature';   // business logic
 *   import { ... } from '@my-org/ui';        // presentational components
 *   import { ... } from '@my-org/utils';     // pure helpers
 *
 * ❌ Forbidden (enforced by ESLint module boundaries):
 *   import { ... } from '@my-org/data-access';  // apps should go through features
 */
import { useEffect, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { getUsers } from '@my-org/feature';
import type { UserViewModel } from '@my-org/feature';
import { Button, Card } from '@my-org/ui';
import { formatDate } from '@my-org/utils';

function HomePage() {
  const [users, setUsers] = useState<UserViewModel[]>([]);
  const today = formatDate(new Date());

  useEffect(() => {
    getUsers().then(setUsers).catch(console.error);
  }, []);

  return (
    <div>
      <h1>Welcome to My Org</h1>
      <p>Today is {today}</p>
      <Button label="Refresh" onClick={() => getUsers().then(setUsers)} />
      {users.map((user) => (
        <Card key={user.id} title={user.displayName} subtitle={user.email}>
          <Link to={`/users/${user.id}`}>View profile</Link>
        </Card>
      ))}
    </div>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/users/:id" element={<div>User detail page</div>} />
    </Routes>
  );
}

export default App;
