import { useState } from 'react';
import styles from './login-form.module.css';

export interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

export function LoginForm({ onSubmit, isLoading, error }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form className={styles['form']} onSubmit={handleSubmit}>
      <h2 className={styles['title']}>Sign In</h2>
      {error && <div className={styles['error']}>{error}</div>}
      <div className={styles['field']}>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          disabled={isLoading}
        />
      </div>
      <div className={styles['field']}>
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          disabled={isLoading}
        />
      </div>
      <button type="submit" className={styles['submit']} disabled={isLoading}>
        {isLoading ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
  );
}
