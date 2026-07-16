import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useNavigate } from 'react-router';
import { authService } from '../api/authService';
import {
  AUTH_UNAUTHORIZED_EVENT,
  clearAccessToken,
  getAccessToken,
  storeAccessToken,
} from '../features/auth/authStorage';
import {
  AuthApiError,
  type AuthUser,
  type LoginPayload,
  type RegistrationPayload,
} from '../features/auth/types';

type AuthStatus = 'checking' | 'authenticated' | 'guest';

type AuthContextValue = {
  readonly user: AuthUser | null;
  readonly status: AuthStatus;
  readonly login: (payload: LoginPayload) => Promise<AuthUser>;
  readonly registerStudent: (payload: RegistrationPayload) => Promise<void>;
  readonly registerInstructor: (payload: RegistrationPayload) => Promise<void>;
  readonly logout: () => Promise<void>;
};

type AuthProviderProps = {
  readonly children: ReactNode;
};

class MissingAuthProviderError extends Error {
  readonly name = 'MissingAuthProviderError';

  constructor() {
    super('useAuth harus digunakan di dalam AuthProvider.');
  }
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>('checking');

  const clearSession = useCallback(() => {
    clearAccessToken();
    setUser(null);
    setStatus('guest');
  }, []);

  useEffect(() => {
    let isActive = true;
    const token = getAccessToken();
    if (!token) {
      setStatus('guest');
      return () => {
        isActive = false;
      };
    }

    void authService.getMe()
      .then((currentUser) => {
        if (!isActive) return;
        setUser(currentUser);
        setStatus('authenticated');
      })
      .catch((error: unknown) => {
        if (!(error instanceof AuthApiError)) throw error;
        if (isActive) clearSession();
      });

    return () => {
      isActive = false;
    };
  }, [clearSession]);

  useEffect(() => {
    const handleUnauthorized = () => {
      clearSession();
      if (window.location.pathname !== '/login') {
        navigate('/login', { replace: true });
      }
    };
    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized);
    return () => window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized);
  }, [clearSession, navigate]);

  const login = useCallback(async (payload: LoginPayload): Promise<AuthUser> => {
    const result = await authService.login(payload);
    storeAccessToken(result.accessToken);
    setUser(result.user);
    setStatus('authenticated');
    return result.user;
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await authService.logout();
    } finally {
      clearSession();
      navigate('/login', { replace: true });
    }
  }, [clearSession, navigate]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    status,
    login,
    registerStudent: authService.registerStudent,
    registerInstructor: authService.registerInstructor,
    logout,
  }), [login, logout, status, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new MissingAuthProviderError();
  return context;
}
