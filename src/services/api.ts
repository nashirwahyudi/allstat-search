/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Placeholder interceptor: reads a token from localStorage so a real auth flow
// can drop one in later without touching call sites.
function withAuthHeaders(init?: RequestInit): RequestInit {
  const token = localStorage.getItem("allstat_auth_token");
  return {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  };
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, withAuthHeaders(init));
  if (!response.ok) {
    throw new Error(`API error ${response.status} on ${path}`);
  }
  return response.json();
}
