import { MousePointerClick, ExternalLink, Languages, Navigation } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { useGa, fmt } from './useGa';

interface Total { event: string; count: number; }
interface Cta { location: string; count: number; }
interface Link { type: string; count: number; }
interface Data { totals: Total[]; ctaByLocation: Cta[]; externalByType: Link[]; }

const EVENT_LABELS: Record<string, { label: string; icon: typeof MousePointerClick }> = {
  cta_click: { label: 'CTA-Klicks', icon: MousePointerClick },
  external_link_click: { label: 'Externe Links', icon: ExternalLink },
  lang_switch: { label: 'Sprachwechsel', icon: Languages },
  nav_click: { label: 'Navigation', icon: Navigation },
};

const LOCATION_LABELS: Record<string, string> = {
  hero: 'Hero',
  header: 'Header',
  contact: 'Kontakt',
  footer: 'Footer',
  unknown: 'Unbekannt',
};

const LINK_LABELS: Record<string, string> = {
  booking: 'Termin (TidyCal)',
  map: 'Karte',
  linkedin: 'LinkedIn',
  email: 'E-Mail',
  phone: 'Telefon',
  other: 'Sonstige',
  unknown: 'Unbekannt',
};

export default function EventsWidget({ days }: { days: number }) {
  const { data, loading, error, refetch } = useGa<Data>(`/api/insights/events?days=${days}`, 5 * 60_000, [days]);

  const totals = data?.totals ?? [];
  const cta = data?.ctaByLocation ?? [];
  const links = data?.externalByType ?? [];

  return (
    <DashboardCard
      title="Custom Events"
      subtitle={`Letzte ${days} Tage`}
      icon={<MousePointerClick size={16} />}
      loading={loading && !data}
      error={error}
      onRetry={refetch}
    >
      {totals.length === 0 ? (
        <div className="asg-empty">Noch keine Events erfasst</div>
      ) : (
        <div className="asg-events">
          <div className="asg-events-totals">
            {totals.map((t) => {
              const meta = EVENT_LABELS[t.event] || { label: t.event, icon: MousePointerClick };
              const Icon = meta.icon;
              return (
                <div key={t.event} className="asg-events-tile">
                  <Icon size={16} className="asg-events-icon" />
                  <div className="asg-events-tile-num">{fmt(t.count)}</div>
                  <div className="asg-events-tile-label">{meta.label}</div>
                </div>
              );
            })}
          </div>

          {cta.length > 0 && (
            <div className="asg-events-section">
              <h4 className="asg-events-h4">CTA nach Position</h4>
              <ul className="asg-list asg-list--inline">
                {cta.map((c, i) => (
                  <li key={i} className="asg-row asg-row--inline">
                    <span className="asg-row-title">{LOCATION_LABELS[c.location] || c.location}</span>
                    <span className="asg-row-stat">{fmt(c.count)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {links.length > 0 && (
            <div className="asg-events-section">
              <h4 className="asg-events-h4">Externe Links nach Typ</h4>
              <ul className="asg-list asg-list--inline">
                {links.map((l, i) => (
                  <li key={i} className="asg-row asg-row--inline">
                    <span className="asg-row-title">{LINK_LABELS[l.type] || l.type}</span>
                    <span className="asg-row-stat">{fmt(l.count)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </DashboardCard>
  );
}
