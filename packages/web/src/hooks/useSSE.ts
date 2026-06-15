import { useEffect, useRef, useState } from 'react';

interface SSEEvent {
  type: string;
  runId: string;
  data: unknown;
}

export function useSSE(runId: string | null) {
  const [events, setEvents] = useState<SSEEvent[]>([]);
  const [connected, setConnected] = useState(false);
  const sourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!runId) return;

    const source = new EventSource(`/api/runs/${runId}/stream`);
    sourceRef.current = source;

    source.onopen = () => setConnected(true);

    source.onmessage = (e: MessageEvent) => {
      try {
        const event = JSON.parse(e.data as string) as SSEEvent;
        setEvents((prev) => [...prev, event]);
      } catch {
        // ignore parse errors
      }
    };

    source.onerror = () => {
      setConnected(false);
      source.close();
    };

    return () => {
      source.close();
      setConnected(false);
    };
  }, [runId]);

  return { events, connected, sourceRef };
}
