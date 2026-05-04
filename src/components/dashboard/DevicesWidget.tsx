import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import DashboardCard from './DashboardCard';
import { useGa, fmt } from './useGa';

interface Device { device: string; sessions: number; visitors: number; percentage: number; }
interface Data { devices: Device[]; }

const COLORS: Record<string, string> = {
  desktop: '#3AA6B9',
  mobile: '#AFDDE9',
  tablet: '#4B5F78',
};

const LABELS: Record<string, string> = {
  desktop: 'Desktop',
  mobile: 'Mobil',
  tablet: 'Tablet',
};

const ICONS: Record<string, typeof Monitor> = {
  desktop: Monitor,
  mobile: Smartphone,
  tablet: Tablet,
};

export default function DevicesWidget({ days }: { days: number }) {
  const { data, loading, error, refetch } = useGa<Data>(`/api/insights/devices?days=${days}`, 5 * 60_000, [days]);
  const devices = data?.devices ?? [];

  const chartData = devices.map((d) => ({
    name: LABELS[d.device] || d.device,
    value: d.sessions,
    color: COLORS[d.device] || '#5C7A94',
  }));

  return (
    <DashboardCard
      title="Geräte"
      subtitle={`Letzte ${days} Tage`}
      icon={<Monitor size={16} />}
      loading={loading && !data}
      error={error}
      onRetry={refetch}
    >
      {devices.length === 0 ? (
        <div className="asg-empty">Noch keine Daten</div>
      ) : (
        <div className="asg-devices">
          <div className="asg-devices-chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} dataKey="value" nameKey="name" innerRadius="55%" outerRadius="85%" paddingAngle={3}>
                  {chartData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#11161d', border: '1px solid rgba(175,221,233,0.18)', borderRadius: 8, color: '#d6dae0' }}
                  formatter={(value: number) => fmt(value)}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="asg-devices-list">
            {devices.map((d, i) => {
              const Icon = ICONS[d.device] || Monitor;
              const color = COLORS[d.device] || '#5C7A94';
              return (
                <li key={i} className="asg-devices-item">
                  <Icon size={14} style={{ color }} />
                  <span className="asg-devices-name">{LABELS[d.device] || d.device}</span>
                  <span className="asg-devices-pct" style={{ color }}>{d.percentage}%</span>
                  <span className="asg-devices-count">{fmt(d.sessions)}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </DashboardCard>
  );
}
