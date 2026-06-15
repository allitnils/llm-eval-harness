const BASE_URL = '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((err as { error: string }).error ?? 'Request failed');
  }
  return res.json() as Promise<T>;
}

export const api = {
  experiments: {
    list: () => request<{ experiments: unknown[] }>('/experiments'),
    get: (id: string) => request<unknown>(`/experiments/${id}`),
    create: (data: unknown) => request<unknown>('/experiments', { method: 'POST', body: JSON.stringify(data) }),
    delete: (id: string) => request<unknown>(`/experiments/${id}`, { method: 'DELETE' }),
  },
  datasets: {
    list: () => request<{ datasets: unknown[] }>('/datasets'),
    get: (id: string) => request<unknown>(`/datasets/${id}`),
    create: (data: unknown) => request<unknown>('/datasets', { method: 'POST', body: JSON.stringify(data) }),
  },
  runs: {
    get: (id: string) => request<unknown>(`/runs/${id}`),
    cancel: (id: string) => request<unknown>(`/runs/${id}/cancel`, { method: 'POST' }),
  },
  models: {
    list: () => request<{ providers: unknown[] }>('/models'),
  },
};
