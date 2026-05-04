import { useEffect, useRef, useState } from 'react';

export function useGa<T>(url: string, intervalMs: number, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const tickRef = useRef(0);

  const fetchOnce = async () => {
    const myTick = ++tickRef.current;
    try {
      const res = await fetch(url);
      if (myTick !== tickRef.current) return;
      const json = await res.json();
      if (!res.ok || json.error) {
        setError(json.error || `HTTP ${res.status}`);
      } else {
        setError(null);
        setData(json as T);
        setLastUpdated(new Date());
      }
    } catch (e) {
      if (myTick !== tickRef.current) return;
      setError(e instanceof Error ? e.message : 'unknown');
    } finally {
      if (myTick === tickRef.current) setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchOnce();
    const id = window.setInterval(fetchOnce, intervalMs);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, intervalMs, ...deps]);

  return { data, loading, error, lastUpdated, refetch: fetchOnce };
}

export function fmt(n: number | undefined | null): string {
  if (n == null || !Number.isFinite(n)) return '0';
  return n.toLocaleString('de-DE');
}

export function fmtTime(d: Date | null): string {
  if (!d) return '—';
  return d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function flagEmoji(code?: string): string {
  if (!code || code.length !== 2) return '🌐';
  const A = 0x1f1e6;
  return String.fromCodePoint(
    A + code.toUpperCase().charCodeAt(0) - 65,
    A + code.toUpperCase().charCodeAt(1) - 65,
  );
}
