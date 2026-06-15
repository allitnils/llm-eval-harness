import { useParams } from 'react-router-dom';
import { useSSE } from '../hooks/useSSE';

export default function Results() {
  const { id } = useParams<{ id: string }>();
  const { events, connected } = useSSE(id ?? null);

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Results</h1>
      <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>Experiment {id}</p>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
        <span style={{ fontSize: '12px', color: connected ? '#22c55e' : 'var(--muted)' }}>
          {connected ? '● Live' : '○ Disconnected'}
        </span>
      </div>
      {events.length === 0 ? (
        <p style={{ color: 'var(--muted)' }}>No events yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {events.map((e, i) => (
            <div key={i} style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--muted)' }}>
              {JSON.stringify(e)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
