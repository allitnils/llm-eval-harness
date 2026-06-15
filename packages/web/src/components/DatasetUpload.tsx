import { useState, ChangeEvent } from 'react';

interface Props {
  onUpload: (data: unknown[]) => void;
}

export function DatasetUpload({ onUpload }: Props) {
  const [error, setError] = useState<string | null>(null);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const text = ev.target?.result as string;
        const data = JSON.parse(text) as unknown[];
        if (!Array.isArray(data)) throw new Error('Expected a JSON array');
        onUpload(data);
        setError(null);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Invalid JSON');
      }
    };
    reader.readAsText(file);
  }

  return (
    <div>
      <input type="file" accept=".json,.jsonl" onChange={handleFile} style={{ display: 'none' }} id="dataset-upload" />
      <label htmlFor="dataset-upload" style={{ display: 'inline-block', padding: '8px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>
        Upload Dataset (JSON)
      </label>
      {error && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>{error}</p>}
    </div>
  );
}
