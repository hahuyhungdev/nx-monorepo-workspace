import styles from './billing-components.module.css';

export type PlanTier = 'free' | 'starter' | 'pro' | 'enterprise';

// ─── Plan Badge ──────────────────────────────────────────

export interface PlanBadgeProps {
  tier: PlanTier;
}

const tierColors: Record<PlanTier, string> = {
  free: 'gray',
  starter: 'blue',
  pro: 'purple',
  enterprise: 'gold',
};

export function PlanBadge({ tier }: PlanBadgeProps) {
  return (
    <span
      className={styles['badge']}
      style={{ '--badge-color': tierColors[tier] } as React.CSSProperties}
    >
      {tier.charAt(0).toUpperCase() + tier.slice(1)}
    </span>
  );
}

// ─── Pricing Card ────────────────────────────────────────

export interface PricingCardProps {
  name: string;
  tier: PlanTier;
  price: number;
  interval: string;
  features: string[];
  isCurrent?: boolean;
  onSelect?: () => void;
}

export function PricingCard({
  name,
  tier,
  price,
  interval,
  features,
  isCurrent,
  onSelect,
}: PricingCardProps) {
  return (
    <div className={`${styles['card']} ${isCurrent ? styles['current'] : ''}`}>
      <div className={styles['header']}>
        <h3>{name}</h3>
        <PlanBadge tier={tier} />
      </div>
      <div className={styles['price']}>
        <span className={styles['amount']}>${price}</span>
        <span className={styles['interval']}>/{interval}</span>
      </div>
      <ul className={styles['features']}>
        {features.map((f) => (
          <li key={f}>✓ {f}</li>
        ))}
      </ul>
      <button className={styles['cta']} onClick={onSelect} disabled={isCurrent}>
        {isCurrent ? 'Current Plan' : 'Select Plan'}
      </button>
    </div>
  );
}
