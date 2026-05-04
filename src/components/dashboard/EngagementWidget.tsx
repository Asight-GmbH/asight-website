import { Heart, TrendingDown, UserPlus, BookOpen } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { useGa } from './useGa';

interface Data {
  engagementRate: number;
  bounceRate: number;
  pagesPerSession: number;
  newUsers: number;
  returningUsers: number;
  newUsersPct: number;
  returningUsersPct: number;
}

function bounceTone(rate: number): 'good' | 'warn' | 'bad' {
  if (rate < 0.4) return 'good';
  if (rate < 0.6) return 'warn';
  return 'bad';
}
function engagementTone(rate: number): 'good' | 'warn' | 'bad' {
  if (rate > 0.6) return 'good';
  if (rate > 0.4) return 'warn';
  return 'bad';
}
function ppsTone(pps: number): 'good' | 'warn' | 'bad' {
  if (pps > 2.5) return 'good';
  if (pps > 1.5) return 'warn';
  return 'bad';
}

export default function EngagementWidget({ days }: { days: number }) {
  const { data, loading, error, refetch } = useGa<Data>(
    `/api/insights/engagement?days=${days}`,
    5 * 60_000,
    [days],
  );

  const eng = data?.engagementRate ?? 0;
  const bnc = data?.bounceRate ?? 0;
  const pps = data?.pagesPerSession ?? 0;
  const newPct = data?.newUsersPct ?? 0;

  return (
    <DashboardCard
      title="Engagement & Bounce Rate"
      subtitle={`Letzte ${days} Tage`}
      icon={<Heart size={16} />}
      loading={loading && !data}
      error={error}
      onRetry={refetch}
    >
      <div className="asg-eng">
        <Metric
          icon={<TrendingDown size={16} />}
          label="Bounce Rate"
          value={`${(bnc * 100).toFixed(1)}%`}
          hint="Anteil Sitzungen ohne Interaktion"
          tone={bounceTone(bnc)}
        />
        <Metric
          icon={<Heart size={16} />}
          label="Engagement Rate"
          value={`${(eng * 100).toFixed(1)}%`}
          hint="≥ 10s Verweildauer oder ≥ 2 Pageviews"
          tone={engagementTone(eng)}
        />
        <Metric
          icon={<UserPlus size={16} />}
          label="Neu / Wiederkehrend"
          value={`${(newPct * 100).toFixed(0)}% / ${((1 - newPct) * 100).toFixed(0)}%`}
          hint={`${data?.newUsers ?? 0} neu · ${data?.returningUsers ?? 0} wiederkehrend`}
          tone="neutral"
        />
        <Metric
          icon={<BookOpen size={16} />}
          label="Seiten / Sitzung"
          value={pps.toFixed(2)}
          hint="Durchschnittliche Tiefe pro Sitzung"
          tone={ppsTone(pps)}
        />
      </div>
    </DashboardCard>
  );
}

function Metric({
  icon, label, value, hint, tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
  tone: 'good' | 'warn' | 'bad' | 'neutral';
}) {
  return (
    <div className={`asg-eng-tile asg-eng-tile--${tone}`}>
      <div className="asg-eng-head">
        <span className="asg-eng-icon">{icon}</span>
        <span className="asg-eng-label">{label}</span>
      </div>
      <div className="asg-eng-value">{value}</div>
      <div className="asg-eng-hint">{hint}</div>
    </div>
  );
}
