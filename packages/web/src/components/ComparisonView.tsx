import { Result } from '../types';

interface Props {
  results: Result[];
}

export function ComparisonView({ results }: Props) {
  if (results.length === 0) return <p style={{ color: 'var(--muted)' }}>No results to compare.</p>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(results.length, 3)}, 1fr)`, gap: '16px' }}>
      {results.map((r) => (
        <div key={r.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '16px' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--muted)', marginBottom: '8px' }}>{r.runId}</div>
          <pre style={{ fontSize: '13px', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{r.output}</pre>
          {r.scores && (
            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
              {Object.entries(r.scores).map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--muted)' }}>
                  <span>{k}</span><span>{typeof v === 'number' ? v.toFixed(3) : String(v)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
