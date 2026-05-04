import type { ReactNode } from 'react';
import { RefreshCw } from 'lucide-react';

interface Props {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  className?: string;
  children: ReactNode;
}

export default function DashboardCard({ title, subtitle, icon, loading, error, onRetry, className, children }: Props) {
  return (
    <div className={`asg-card ${className ?? ''}`}>
      <div className="asg-card-header">
        <div className="asg-card-title-wrap">
          {icon && <span className="asg-card-icon">{icon}</span>}
          <div>
            <h3 className="asg-card-title">{title}</h3>
            {subtitle && <p className="asg-card-subtitle">{subtitle}</p>}
          </div>
        </div>
        {loading && <RefreshCw className="asg-card-spinner" size={14} />}
      </div>
      <div className="asg-card-body">
        {error ? (
          <div className="asg-card-error">
            <p>{error}</p>
            {onRetry && <button onClick={onRetry} className="asg-btn-retry">Erneut versuchen</button>}
          </div>
        ) : children}
      </div>
    </div>
  );
}
