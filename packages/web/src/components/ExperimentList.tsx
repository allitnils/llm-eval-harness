import { Experiment } from '../types';

interface Props {
  experiments: Experiment[];
  onSelect: (id: string) => void;
}

export function ExperimentList({ experiments, onSelect }: Props) {
  return (
    <div>
      {experiments.map((exp) => (
        <button
          key={exp.id}
          onClick={() => onSelect(exp.id)}
          style={{ display: 'block', width: '100%', textAlign: 'left', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', padding: '12px 16px', marginBottom: '8px', cursor: 'pointer', color: 'var(--text)' }}
        >
          <div style={{ fontWeight: 600 }}>{exp.name}</div>
        </button>
      ))}
    </div>
  );
}
