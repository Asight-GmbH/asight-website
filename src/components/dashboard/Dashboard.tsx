import { useState } from 'react';
import { Activity } from 'lucide-react';
import OverviewWidget from './OverviewWidget';
import EngagementWidget from './EngagementWidget';
import RealtimeWidget from './RealtimeWidget';
import TimeseriesWidget from './TimeseriesWidget';
import SourcesWidget from './SourcesWidget';
import PagesWidget from './PagesWidget';
import GeoWidget from './GeoWidget';
import DevicesWidget from './DevicesWidget';
import EventsWidget from './EventsWidget';
import QueriesWidget from './QueriesWidget';

const RANGES = [
  { value: 7,  label: '7 T.' },
  { value: 30, label: '30 T.' },
  { value: 90, label: '90 T.' },
];

export default function Dashboard() {
  const [days, setDays] = useState(30);

  return (
    <div className="asg-dash">
      <header className="asg-dash-header">
        <div className="asg-dash-title">
          <Activity size={20} className="asg-dash-title-icon" />
          <div>
            <h1>ASIGHT Insights</h1>
            <p>Live-Analytics auf Basis von Google Analytics 4</p>
          </div>
        </div>
        <div className="asg-range">
          {RANGES.map((r) => (
            <button
              key={r.value}
              type="button"
              className={`asg-range-btn ${days === r.value ? 'is-active' : ''}`}
              onClick={() => setDays(r.value)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </header>

      <div className="asg-grid">
        <div className="asg-cell asg-cell--overview"><OverviewWidget days={days} /></div>
        <div className="asg-cell asg-cell--realtime"><RealtimeWidget /></div>
        <div className="asg-cell asg-cell--timeseries"><TimeseriesWidget days={days} /></div>
        <div className="asg-cell asg-cell--engagement"><EngagementWidget days={days} /></div>
        <div className="asg-cell asg-cell--events"><EventsWidget days={days} /></div>
        <div className="asg-cell asg-cell--sources"><SourcesWidget days={days} /></div>
        <div className="asg-cell asg-cell--devices"><DevicesWidget days={days} /></div>
        <div className="asg-cell asg-cell--pages"><PagesWidget days={days} /></div>
        <div className="asg-cell asg-cell--geo"><GeoWidget days={days} /></div>
        <div className="asg-cell asg-cell--queries"><QueriesWidget days={days} /></div>
      </div>
    </div>
  );
}
