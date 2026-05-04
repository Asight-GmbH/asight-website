import { TrendingUp } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import DashboardCard from './DashboardCard';
import { useGa, fmt } from './useGa';

interface Point {
  date: string;
  label: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}
interface Data {
  data: Point[];
  totals: { clicks: number; impressions: number };
}

export default function SeoTrendWidget({ days }: { days: number }) {
  const { data, loading, error, refetch } = useGa<Data>(
    `/api/insights/queries-timeseries?days=${days}`,
    10 * 60_000,
    [days],
  );

  const points = data?.data ?? [];

  return (
    <DashboardCard
      title="SEO Performance"
      subtitle={`Google Search · ${fmt(data?.totals?.clicks ?? 0)} Klicks · ${fmt(data?.totals?.impressions ?? 0)} Impressions · ${days} Tage`}
      icon={<TrendingUp size={16} />}
      loading={loading && !data}
      error={error}
      onRetry={refetch}
    >
      {points.length === 0 ? (
        <div className="asg-empty">Noch keine GSC-Daten — 1-3 Tage Verzögerung</div>
      ) : (
        <div className="asg-chart-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={points} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(175,221,233,0.08)" />
              <XAxis
                dataKey="label"
                tick={{ fill: '#8791a1', fontSize: 11 }}
                stroke="rgba(175,221,233,0.15)"
              />
              <YAxis
                yAxisId="clicks"
                orientation="left"
                tick={{ fill: '#3AA6B9', fontSize: 11 }}
                stroke="rgba(58,166,185,0.4)"
                allowDecimals={false}
              />
              <YAxis
                yAxisId="impressions"
                orientation="right"
                tick={{ fill: '#AFDDE9', fontSize: 11 }}
                stroke="rgba(175,221,233,0.4)"
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  background: '#11161d',
                  border: '1px solid rgba(175,221,233,0.18)',
                  borderRadius: 8,
                  color: '#d6dae0',
                }}
                labelStyle={{ color: '#AFDDE9' }}
                formatter={(value: number, name: string) => [fmt(value), name]}
              />
              <Legend wrapperStyle={{ color: '#8791a1', fontSize: 12 }} />
              <Line
                yAxisId="clicks"
                type="monotone"
                dataKey="clicks"
                name="Klicks"
                stroke="#3AA6B9"
                strokeWidth={2.5}
                dot={false}
              />
              <Line
                yAxisId="impressions"
                type="monotone"
                dataKey="impressions"
                name="Impressions"
                stroke="#AFDDE9"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </DashboardCard>
  );
}
