import { Eye, Users, Clock, FileText, BarChart3 } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { useGa, fmt } from './useGa';

interface Data {
  sessions: number;
  visitors: number;
  avgDuration: string;
  pageViews: number;
  pagesPerSession: number;
}

export default function OverviewWidget({ days }: { days: number }) {
  const { data, loading, error, refetch } = useGa<Data>(
    `/api/insights/summary?days=${days}`,
    5 * 60_000,
    [days],
  );

  return (
    <DashboardCard
      title="Übersicht"
      subtitle={`Letzte ${days} Tage`}
      icon={<BarChart3 size={16} />}
      loading={loading && !data}
      error={error}
      onRetry={refetch}
    >
      <div className="asg-overview">
        <Tile icon={<Eye size={18} />}      label="Sitzungen"     value={fmt(data?.sessions ?? 0)} />
        <Tile icon={<Users size={18} />}    label="Besucher"      value={fmt(data?.visitors ?? 0)} />
        <Tile icon={<Clock size={18} />}    label="Ø Verweildauer" value={data?.avgDuration ?? '0:00'} />
        <Tile icon={<FileText size={18} />} label="Seitenaufrufe" value={fmt(data?.pageViews ?? 0)} />
      </div>
    </DashboardCard>
  );
}

function Tile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="asg-ov-tile">
      <span className="asg-ov-icon">{icon}</span>
      <div className="asg-ov-num">{value}</div>
      <div className="asg-ov-label">{label}</div>
    </div>
  );
}
