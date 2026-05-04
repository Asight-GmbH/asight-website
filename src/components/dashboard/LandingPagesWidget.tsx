import { LogIn, Clock } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { useGa, fmt } from './useGa';

interface Page {
  path: string;
  sessions: number;
  bounceRate: number;
  avgDuration: string;
  avgDurationSeconds: number;
}
interface Data { pages: Page[]; totalSessions: number; }

function shorten(s: string, max = 38): string {
  return s.length > max ? s.slice(0, max - 1) + '…' : s;
}

function bounceClass(rate: number): string {
  if (rate < 0.4) return 'asg-bounce--good';
  if (rate < 0.6) return 'asg-bounce--warn';
  return 'asg-bounce--bad';
}

export default function LandingPagesWidget({ days }: { days: number }) {
  const { data, loading, error, refetch } = useGa<Data>(
    `/api/insights/landing-pages?days=${days}&limit=10`,
    5 * 60_000,
    [days],
  );

  const pages = data?.pages ?? [];
  const maxSessions = pages.reduce((m, p) => Math.max(m, p.sessions), 0);

  return (
    <DashboardCard
      title="Einstiegsseiten"
      subtitle={`Top ${pages.length || 10} Einstiegsseiten · ${days} Tage`}
      icon={<LogIn size={16} />}
      loading={loading && !data}
      error={error}
      onRetry={refetch}
    >
      {pages.length === 0 ? (
        <div className="asg-empty">Noch keine Daten</div>
      ) : (
        <div className="asg-lp-table-wrap">
          <table className="asg-lp-table">
            <thead>
              <tr>
                <th>Seite</th>
                <th className="asg-lp-num">Sessions</th>
                <th className="asg-lp-bounce-h">Bounce</th>
                <th className="asg-lp-num"><Clock size={12} style={{ verticalAlign: 'middle' }} /></th>
              </tr>
            </thead>
            <tbody>
              {pages.map((p, i) => (
                <tr key={i}>
                  <td className="asg-lp-key">
                    <div
                      className="asg-lp-bar"
                      style={{ width: `${maxSessions > 0 ? (p.sessions / maxSessions) * 100 : 0}%` }}
                    />
                    <span title={p.path}>{shorten(p.path)}</span>
                  </td>
                  <td className="asg-lp-num">{fmt(p.sessions)}</td>
                  <td className="asg-lp-bounce">
                    <div className={`asg-bounce-pill ${bounceClass(p.bounceRate)}`}>
                      <div
                        className="asg-bounce-fill"
                        style={{ width: `${Math.min(p.bounceRate * 100, 100)}%` }}
                      />
                      <span>{(p.bounceRate * 100).toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="asg-lp-num asg-muted">{p.avgDuration}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="asg-lp-footer">Gesamt: {fmt(data?.totalSessions ?? 0)} Sessions</div>
        </div>
      )}
    </DashboardCard>
  );
}
