import styles from './card.module.css';

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
