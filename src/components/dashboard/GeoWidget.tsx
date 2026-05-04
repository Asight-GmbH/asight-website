import { Globe } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { useGa, fmt, flagEmoji } from './useGa';

interface Country { country: string; countryCode: string; sessions: number; visitors: number; }
interface Data { countries: Country[]; }

export default function GeoWidget({ days }: { days: number }) {
  const { data, loading, error, refetch } = useGa<Data>(`/api/insights/geo?days=${days}`, 5 * 60_000, [days]);
  const countries = (data?.countries ?? []).slice(0, 10);
  const max = countries.reduce((m, c) => Math.max(m, c.sessions), 0);

  return (
    <DashboardCard
      title="Top-Länder"
      subtitle={`Letzte ${days} Tage`}
      icon={<Globe size={16} />}
      loading={loading && !data}
      error={error}
      onRetry={refetch}
    >
      {countries.length === 0 ? (
        <div className="asg-empty">Noch keine Daten</div>
      ) : (
        <ul className="asg-list">
          {countries.map((c, i) => (
            <li key={i} className="asg-row">
              <div className="asg-row-bg" style={{ width: `${max > 0 ? (c.sessions / max) * 100 : 0}%` }} />
              <div className="asg-row-content">
                <span className="asg-flag">{flagEmoji(c.countryCode)}</span>
                <span className="asg-row-title">{c.country}</span>
                <span className="asg-row-stat">{fmt(c.sessions)}</span>
                <span className="asg-row-stat asg-muted">{fmt(c.visitors)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </DashboardCard>
  );
}
