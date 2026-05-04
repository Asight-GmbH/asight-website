import { TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DashboardCard from './DashboardCard';
import { useGa, fmt } from './useGa';

interface Point { date: string; sessions: number; visitors: number; }
interface Data { data: Point[]; period: string; }

function formatDate(yyyymmdd: string): string {
  if (yyyymmdd.length !== 8) return yyyymmdd;
  return `${yyyymmdd.slice(6, 8)}.${yyyymmdd.slice(4, 6)}.`;
}

export default function TimeseriesWidget({ days }: { days: number }) {
  const { data, loading, error, refetch } = useGa<Data>(`/api/insights/timeseries?days=${days}`, 5 * 60_000, [days]);

  const chartData = (data?.data ?? []).map((p) => ({ ...p, label: formatDate(p.date) }));
  const totalSessions = chartData.reduce((s, p) => s + p.sessions, 0);
  const totalVisitors = chartData.reduce((s, p) => s + p.visitors, 0);

  return (
    <DashboardCard
      title="Verlauf"
      subtitle={`Letzte ${days} Tage · ${fmt(totalSessions)} Sitzungen · ${fmt(totalVisitors)} Besucher`}
      icon={<TrendingUp size={16} />}
      loading={loading && !data}
      error={error}
      onRetry={refetch}
    >
      <div className="asg-chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(175,221,233,0.08)" />
            <XAxis dataKey="label" tick={{ fill: '#8791a1', fontSize: 11 }} stroke="rgba(175,221,233,0.15)" />
            <YAxis tick={{ fill: '#8791a1', fontSize: 11 }} stroke="rgba(175,221,233,0.15)" allowDecimals={false} />
            <Tooltip
              contentStyle={{ background: '#11161d', border: '1px solid rgba(175,221,233,0.18)', borderRadius: 8, color: '#d6dae0' }}
              labelStyle={{ color: '#AFDDE9' }}
            />
            <Legend wrapperStyle={{ color: '#8791a1', fontSize: 12 }} />
            <Line type="monotone" dataKey="sessions" name="Sitzungen" stroke="#3AA6B9" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="visitors" name="Besucher" stroke="#AFDDE9" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
