interface ScoreData {
  model: string;
  rouge1: number;
  rouge2: number;
  rougeL: number;
}

interface Props {
  data: ScoreData[];
}

export function ScoreChart({ data }: Props) {
  if (data.length === 0) return null;

  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead>
          <tr>
            {['Model', 'ROUGE-1', 'ROUGE-2', 'ROUGE-L'].map((h) => (
              <th key={h} style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontWeight: 500 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.model}>
              <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>{row.model}</td>
              <td style={{ padding: '8px 12px' }}>{row.rouge1.toFixed(3)}</td>
              <td style={{ padding: '8px 12px' }}>{row.rouge2.toFixed(3)}</td>
              <td style={{ padding: '8px 12px' }}>{row.rougeL.toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
