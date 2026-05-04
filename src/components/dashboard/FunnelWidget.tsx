import { Filter, AlertCircle } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { useGa, fmt } from './useGa';

interface Stage {
  key: string;
  name: string;
  count: number;
  pct: number;
  hint: string;
}
interface Data {
  stages: Stage[];
  bookingTracked: boolean;
  totalConversion: number;
}

export default function FunnelWidget({ days }: { days: number }) {
  const { data, loading, error, refetch } = useGa<Data>(
    `/api/insights/funnel?days=${days}`,
    5 * 60_000,
    [days],
  );

  const stages = data?.stages ?? [];
  const top = stages[0]?.count || 1;

  return (
    <DashboardCard
      title="Conversion Funnel"
      subtitle={`${days} Tage · Gesamt-Conversion ${(data?.totalConversion ?? 0).toFixed(2)}%`}
      icon={<Filter size={16} />}
      loading={loading && !data}
      error={error}
      onRetry={refetch}
    >
      {!data?.bookingTracked && stages.length > 0 && (
        <div className="asg-funnel-warning">
          <AlertCircle size={14} />
          <span>Letzte Stufe zeigt alle externen Links (Maps, LinkedIn, …) — registriere die Custom Dimension <code>link_type</code> in GA4, um nur TidyCal-Klicks zu zählen.</span>
        </div>
      )}

      {stages.length === 0 ? (
        <div className="asg-empty">Noch keine Daten</div>
      ) : (
        <div className="asg-funnel">
          {stages.map((s, i) => {
            const widthPct = top > 0 ? (s.count / top) * 100 : 0;
            const dropFromPrev = i > 0
              ? stages[i - 1].count > 0
                ? ((s.count - stages[i - 1].count) / stages[i - 1].count) * 100
                : 0
              : null;
            return (
              <div key={s.key} className="asg-funnel-step">
                {dropFromPrev !== null && (
                  <div className="asg-funnel-drop">
                    <span className={dropFromPrev > -50 ? 'asg-drop--ok' : 'asg-drop--bad'}>
                      ↓ {dropFromPrev.toFixed(1)}%
                    </span>
                  </div>
                )}
                <div className="asg-funnel-bar-wrap">
                  <div
                    className="asg-funnel-bar"
                    style={{ width: `${Math.max(widthPct, 6)}%`, opacity: 1 - i * 0.12 }}
                  >
                    <span className="asg-funnel-count">{fmt(s.count)}</span>
                  </div>
                  <div className="asg-funnel-meta">
                    <div className="asg-funnel-name">{s.name}</div>
                    <div className="asg-funnel-pct">{s.pct.toFixed(1)}% · {s.hint}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardCard>
  );
}
