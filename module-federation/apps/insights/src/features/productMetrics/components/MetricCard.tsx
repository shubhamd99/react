// hooks
import cn from 'classnames';

// components / ui
import { Card } from '@repo/ui';

interface Props {
  label: string;
  value: string;
  change: string;
  trending: 'up' | 'down';
  headline: string;
  description: string;
}

const ArrowUp = () => <span style={{ fontSize: 12 }}>↗</span>;
const ArrowDown = () => <span style={{ fontSize: 12 }}>↘</span>;

const MetricCard = ({
  label,
  value,
  change,
  trending,
  headline,
  description,
}: Props) => (
  <Card className="h-full">
    <Card.Body>
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm text-muted">{label}</span>
        <span
          className={cn(
            'flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
            {
              'bg-green-50 text-green-700': trending === 'up',
              'bg-red-50 text-danger': trending === 'down',
            }
          )}
        >
          {trending === 'up' ? <ArrowUp /> : <ArrowDown />}
          {change}
        </span>
      </div>

      <p className="mt-3 text-3xl font-bold tracking-tight text-primary">
        {value}
      </p>

      <div className="mt-4 border-t border-surface-border pt-3">
        <p className="flex items-center gap-1 text-sm font-semibold text-primary">
          {headline}
          {trending === 'up' ? <ArrowUp /> : <ArrowDown />}
        </p>
        <p className="mt-0.5 text-xs text-muted">{description}</p>
      </div>
    </Card.Body>
  </Card>
);

export default MetricCard;
