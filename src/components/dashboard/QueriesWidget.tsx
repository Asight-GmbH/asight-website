import { useState } from 'react';
import { Search } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { useGa, fmt } from './useGa';

interface Row {
  key: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}
interface Data {
  rows: Row[];
  totals: { clicks: number; impressions: number } | null;
}

function shorten(s: string, max = 50): string {
  return s.length > max ? s.slice(0, max - 1) + '…' : s;
}

export default function QueriesWidget({ days }: { days: number }) {
  const [dim, setDim] = useState<'query' | 'page'>('query');
  const { data, loading, error, refetch } = useGa<Data>(
    `/api/insights/queries?days=${days}&dimension=${dim}`,
    10 * 60_000,
    [days, dim],
  );

  const rows = data?.rows ?? [];
  const maxClicks = rows.reduce((m, r) => Math.max(m, r.clicks), 0);

  return (
    <DashboardCard
      title="Suchanfragen"
      subtitle={`Google Search · ${fmt(data?.totals?.clicks ?? 0)} Klicks · ${fmt(data?.totals?.impressions ?? 0)} Impressions`}
      icon={<Search size={16} />}
      loading={loading && !data}
      error={error}
      onRetry={refetch}
    >
      <div className="asg-queries-tabs">
        <button
          type="button"
          className={`asg-queries-tab ${dim === 'query' ? 'is-active' : ''}`}
          onClick={() => setDim('query')}
        >
          Suchbegriffe
        </button>
        <button
          type="button"
          className={`asg-queries-tab ${dim === 'page' ? 'is-active' : ''}`}
          onClick={() => setDim('page')}
        >
          Landing-Seiten
        </button>
      </div>

      {rows.length === 0 ? (
        <div className="asg-empty">Noch keine Daten — GSC braucht 1-3 Tage</div>
      ) : (
        <div className="asg-queries-table-wrap">
          <table className="asg-queries-table">
            <thead>
              <tr>
                <th>{dim === 'query' ? 'Suchbegriff' : 'Seite'}</th>
                <th className="asg-queries-num">Klicks</th>
                <th className="asg-queries-num">Impr.</th>
                <th className="asg-queries-num">CTR</th>
                <th className="asg-queries-num">Pos.</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td className="asg-queries-key">
                    <div
                      className="asg-queries-bar"
                      style={{ width: `${maxClicks > 0 ? (r.clicks / maxClicks) * 100 : 0}%` }}
                    />
                    <span title={r.key}>{shorten(r.key)}</span>
                  </td>
                  <td className="asg-queries-num">{fmt(r.clicks)}</td>
                  <td className="asg-queries-num asg-muted">{fmt(r.impressions)}</td>
                  <td className="asg-queries-num">{(r.ctr * 100).toFixed(1)}%</td>
                  <td className="asg-queries-num asg-muted">{r.position.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardCard>
  );
}
