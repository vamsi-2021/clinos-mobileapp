const BASE_URL = 'https://api.example.com'; // TODO: Replace with actual API URL

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type ApiResponse<T> = {
  data: T;
  message?: string;
};

async function request<T>(
  method: RequestMethod,
  endpoint: string,
  body?: object,
  token?: string,
): Promise<ApiResponse<T>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message ?? `Request failed: ${response.status}`);
  }

  return response.json();
}

export const api = {
  get: <T>(endpoint: string, token?: string) =>
    request<T>('GET', endpoint, undefined, token),

  post: <T>(endpoint: string, body: object, token?: string) =>
    request<T>('POST', endpoint, body, token),

  put: <T>(endpoint: string, body: object, token?: string) =>
    request<T>('PUT', endpoint, body, token),

  patch: <T>(endpoint: string, body: object, token?: string) =>
    request<T>('PATCH', endpoint, body, token),

  delete: <T>(endpoint: string, token?: string) =>
    request<T>('DELETE', endpoint, undefined, token),
};
