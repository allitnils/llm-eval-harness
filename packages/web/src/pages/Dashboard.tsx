import { Link } from 'react-router-dom';
import { useExperiments } from '../hooks/useExperiments';

export default function Dashboard() {
  const { experiments, loading } = useExperiments();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '4px' }}>Dashboard</h1>
          <p style={{ color: 'var(--muted)' }}>LLM evaluation platform</p>
        </div>
        <Link
          to="/experiments/new"
          style={{
            background: 'var(--accent)', color: '#fff', padding: '10px 20px',
            borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: 500,
          }}
        >
          New Experiment
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Total Experiments', value: experiments.length },
          { label: 'Datasets', value: 0 },
          { label: 'Models Tested', value: 0 },
        ].map(({ label, value }) => (
          <div key={label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '20px' }}>
            <div style={{ color: 'var(--muted)', fontSize: '12px', marginBottom: '8px' }}>{label}</div>
            <div style={{ fontSize: '32px', fontWeight: 700 }}>{loading ? '—' : value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
