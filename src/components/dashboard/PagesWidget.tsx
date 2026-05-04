import { FileText, Eye, Users } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { useGa, fmt } from './useGa';

interface Page { title: string; path: string; views: number; visitors: number; }
interface Data { pages: Page[]; }

function shorten(s: string, max = 40): string {
  return s.length > max ? s.slice(0, max - 1) + '…' : s;
}

export default function PagesWidget({ days }: { days: number }) {
  const { data, loading, error, refetch } = useGa<Data>(`/api/insights/pages?days=${days}&limit=8`, 5 * 60_000, [days]);
  const pages = data?.pages ?? [];
  const max = pages.reduce((m, p) => Math.max(m, p.views), 0);

  return (
    <DashboardCard
      title="Top-Seiten"
      subtitle={`Letzte ${days} Tage`}
      icon={<FileText size={16} />}
      loading={loading && !data}
      error={error}
      onRetry={refetch}
    >
      {pages.length === 0 ? (
        <div className="asg-empty">Noch keine Daten</div>
      ) : (
        <ul className="asg-list">
          {pages.map((p, i) => (
            <li key={i} className="asg-row" title={p.path}>
              <div className="asg-row-bg" style={{ width: `${max > 0 ? (p.views / max) * 100 : 0}%` }} />
              <div className="asg-row-content">
                <span className="asg-row-title">{shorten(p.title)}</span>
                <span className="asg-row-stat"><Eye size={12} /> {fmt(p.views)}</span>
                <span className="asg-row-stat"><Users size={12} /> {fmt(p.visitors)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </DashboardCard>
  );
}
