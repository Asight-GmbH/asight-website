import { Compass } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DashboardCard from './DashboardCard';
import { useGa, fmt } from './useGa';

interface Source { source: string; sessions: number; visitors: number; percentage: number; }
interface Data { sources: Source[]; totalSessions: number; }

const PALETTE = ['#3AA6B9', '#AFDDE9', '#4B5F78', '#2E8A9A', '#7FB8C8', '#243341', '#5C7A94'];

const LABELS: Record<string, string> = {
  'Organic Search': 'Organische Suche',
  'Direct': 'Direkt',
  'Referral': 'Verweis',
  'Organic Social': 'Soziale Medien',
  'Social': 'Soziale Medien',
  'Email': 'E-Mail',
  'Paid Search': 'Bezahlte Suche',
  'Paid Social': 'Paid Social',
  'Display': 'Display',
  'Affiliates': 'Affiliates',
  'Unassigned': 'Sonstige',
};

export default function SourcesWidget({ days }: { days: number }) {
  const { data, loading, error, refetch } = useGa<Data>(`/api/insights/sources?days=${days}`, 5 * 60_000, [days]);

  const chartData = (data?.sources ?? []).map((s) => ({
    name: LABELS[s.source] || s.source,
    value: s.sessions,
    percentage: s.percentage,
  }));

  return (
    <DashboardCard
      title="Traffic-Quellen"
      subtitle={`${fmt(data?.totalSessions ?? 0)} Sitzungen · ${days} Tage`}
      icon={<Compass size={16} />}
      loading={loading && !data}
      error={error}
      onRetry={refetch}
    >
      {chartData.length === 0 ? (
        <div className="asg-empty">Noch keine Daten</div>
      ) : (
        <div className="asg-chart-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" innerRadius="50%" outerRadius="80%" paddingAngle={2}>
                {chartData.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#11161d', border: '1px solid rgba(175,221,233,0.18)', borderRadius: 8, color: '#d6dae0' }}
                formatter={(value: number, _name, item: any) => [`${fmt(value)} (${item.payload.percentage}%)`, item.payload.name]}
              />
              <Legend wrapperStyle={{ color: '#8791a1', fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </DashboardCard>
  );
}
