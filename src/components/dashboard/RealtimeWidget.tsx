import { Radio, MapPin, Users } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { useGa, fmt, flagEmoji } from './useGa';

interface Loc { country: string; countryCode: string; city: string; users: number; }
interface RealtimeData { activeUsers: number; locations: Loc[]; lastUpdated: string; }

export default function RealtimeWidget() {
  const { data, loading, error, refetch } = useGa<RealtimeData>('/api/insights/realtime', 30_000);

  return (
    <DashboardCard
      title="Live-Nutzer"
      subtitle="Aktiv in den letzten 30 Min."
      icon={<Radio size={16} />}
      loading={loading && !data}
      error={error}
      onRetry={refetch}
    >
      <div className="asg-rt">
        <div className="asg-rt-main">
          <div className="asg-rt-pulse" />
          <div className="asg-rt-num">{fmt(data?.activeUsers ?? 0)}</div>
          <div className="asg-rt-label"><Users size={14} /> aktiv jetzt</div>
        </div>
        {data?.locations && data.locations.length > 0 && (
          <ul className="asg-rt-list">
            {data.locations.slice(0, 6).map((loc, i) => (
              <li key={i} className="asg-rt-item">
                <span className="asg-flag">{flagEmoji(loc.countryCode)}</span>
                <span className="asg-rt-place">{loc.city ? `${loc.city}, ${loc.country}` : loc.country}</span>
                <span className="asg-rt-count">{loc.users}</span>
              </li>
            ))}
          </ul>
        )}
        {data?.locations && data.locations.length === 0 && (
          <div className="asg-rt-empty"><MapPin size={14} /> Keine aktiven Standorte</div>
        )}
      </div>
    </DashboardCard>
  );
}
