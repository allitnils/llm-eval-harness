interface Props {
  total: number;
  completed: number;
  status: string;
}

export function RunProgress({ total, completed, status }: Props) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--muted)', marginBottom: '6px' }}>
        <span>{status}</span>
        <span>{completed}/{total}</span>
      </div>
      <div style={{ background: 'var(--border)', borderRadius: '9999px', height: '6px' }}>
        <div style={{ background: 'var(--accent)', borderRadius: '9999px', height: '6px', width: `${pct}%`, transition: 'width 0.3s ease' }} />
      </div>
    </div>
  );
}
