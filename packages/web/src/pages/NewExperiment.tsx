import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';

export default function NewExperiment() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await api.experiments.create({
        name,
        description,
        datasetId: 'placeholder',
        models: [],
      });
      void navigate('/experiments');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create experiment');
    } finally {
      setSubmitting(false);
    }
  }

  const inputStyle = {
    width: '100%', padding: '10px 12px', background: 'var(--surface)',
    border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)',
    fontSize: '14px', outline: 'none',
  };

  return (
    <div style={{ maxWidth: '600px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>New Experiment</h1>
      {error && <div style={{ background: '#450a0a', border: '1px solid #dc2626', borderRadius: '6px', padding: '12px', marginBottom: '16px', color: '#fca5a5' }}>{error}</div>}
      <form onSubmit={(e) => { void handleSubmit(e); }}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '6px' }}>Name *</label>
          <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '6px' }}>Description</label>
          <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }} value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="submit" disabled={submitting} style={{ background: 'var(--accent)', color: '#fff', padding: '10px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
            {submitting ? 'Creating...' : 'Create Experiment'}
          </button>
          <button type="button" onClick={() => void navigate('/experiments')} style={{ background: 'transparent', color: 'var(--muted)', padding: '10px 20px', borderRadius: '6px', border: '1px solid var(--border)', cursor: 'pointer' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
