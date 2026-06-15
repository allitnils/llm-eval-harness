import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Experiments from './pages/Experiments';
import NewExperiment from './pages/NewExperiment';
import Results from './pages/Results';

export default function App() {
  const { pathname } = useLocation();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <nav style={{
        background: 'var(--surface)', borderBottom: '1px solid var(--border)',
        padding: '0 24px', display: 'flex', alignItems: 'center', gap: '24px', height: '56px',
      }}>
        <span style={{ fontWeight: 700, color: 'var(--accent)', fontFamily: 'monospace' }}>
          llm-eval
        </span>
        {[
          { to: '/', label: 'Dashboard' },
          { to: '/experiments', label: 'Experiments' },
        ].map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            style={{
              color: pathname === to ? 'var(--accent)' : 'var(--muted)',
              textDecoration: 'none',
              fontSize: '14px',
            }}
          >
            {label}
          </Link>
        ))}
      </nav>

      <main style={{ flex: 1, padding: '32px 24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/experiments" element={<Experiments />} />
          <Route path="/experiments/new" element={<NewExperiment />} />
          <Route path="/experiments/:id/results" element={<Results />} />
        </Routes>
      </main>
    </div>
  );
}
