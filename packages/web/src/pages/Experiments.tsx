import { Link } from 'react-router-dom';
import { useExperiments } from '../hooks/useExperiments';
import { Experiment } from '../types';

export default function Experiments() {
  const { experiments, loading, error } = useExperiments();

  if (loading) return <p style={{ color: 'var(--muted)' }}>Loading...</p>;
  if (error) return <p style={{ color: '#ef4444' }}>Error: {error}</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700 }}>Experiments</h1>
        <Link to="/experiments/new" style={{ background: 'var(--accent)', color: '#fff', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', fontSize: '14px' }}>
          New Experiment
        </Link>
      </div>

      {experiments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--muted)' }}>
          <p>No experiments yet.</p>
          <Link to="/experiments/new" style={{ color: 'var(--accent)' }}>Create your first experiment →</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {experiments.map((exp: Experiment) => (
            <div key={exp.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{exp.name}</div>
                {exp.description && <div style={{ color: 'var(--muted)', fontSize: '13px' }}>{exp.description}</div>}
              </div>
              <Link to={`/experiments/${exp.id}/results`} style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '14px' }}>
                View Results →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
