import { useState, useEffect } from 'react';
import { api } from '../api/client';
import { Experiment } from '../types';

export function useExperiments() {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.experiments
      .list()
      .then((data) => setExperiments(data.experiments as Experiment[]))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { experiments, loading, error, setExperiments };
}
