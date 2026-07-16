export const AUTH_TOKEN_KEY = 'coursehub_access_token';
export const AUTH_UNAUTHORIZED_EVENT = 'coursehub:unauthorized';

export function getAccessToken(): string | null {
  return window.sessionStorage.getItem(AUTH_TOKEN_KEY);
}

export function storeAccessToken(token: string): void {
  window.sessionStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearAccessToken(): void {
  window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
}

export function notifyUnauthorized(): void {
  window.dispatchEvent(new Event(AUTH_UNAUTHORIZED_EVENT));
}
