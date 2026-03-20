import styles from './ui.module.css';

/**
 * UI layer — presentational components only.
 * Depends on: utils (for formatting helpers)
 * Does NOT depend on: feature, data-access
 */

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button
      className={styles[variant]}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export interface CardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function Card({ title, subtitle, children }: CardProps) {
  return (
    <div className={styles['card']}>
      <h2>{title}</h2>
      {subtitle && <p className={styles['subtitle']}>{subtitle}</p>}
      <div>{children}</div>
    </div>
  );
}
