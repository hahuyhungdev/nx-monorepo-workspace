import { useState } from 'react';
import styles from './auth-forms.module.css';

// ─── Login Form ──────────────────────────────────────────

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
      <button
        type="submit"
        className={styles['submit']}
        disabled={isLoading}
      >
        {isLoading ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
  );
}

// ─── Signup Form ─────────────────────────────────────────

export interface SignupFormProps {
  onSubmit: (email: string, password: string, name: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

export function SignupForm({ onSubmit, isLoading, error }: SignupFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password, name);
  };

  return (
    <form className={styles['form']} onSubmit={handleSubmit}>
      <h2 className={styles['title']}>Create Account</h2>
      {error && <div className={styles['error']}>{error}</div>}
      <div className={styles['field']}>
        <label htmlFor="signup-name">Name</label>
        <input
          id="signup-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          disabled={isLoading}
        />
      </div>
      <div className={styles['field']}>
        <label htmlFor="signup-email">Email</label>
        <input
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          disabled={isLoading}
        />
      </div>
      <div className={styles['field']}>
        <label htmlFor="signup-password">Password</label>
        <input
          id="signup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        className={styles['submit']}
        disabled={isLoading}
      >
        {isLoading ? 'Creating account…' : 'Create Account'}
      </button>
    </form>
  );
}
