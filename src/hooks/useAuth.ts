import {useState, useCallback} from 'react';

type AuthState = {
  isAuthenticated: boolean;
  user: {id: string; name: string; email: string} | null;
  isLoading: boolean;
  error: string | null;
};

type UseAuthReturn = AuthState & {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
};

export function useAuth(): UseAuthReturn {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null,
  });

  const login = useCallback(async (email: string, _password: string) => {
    setState(prev => ({...prev, isLoading: true, error: null}));
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setState({
        isAuthenticated: true,
        user: {id: '1', name: 'John Doe', email},
        isLoading: false,
        error: null,
      });
    } catch {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Login failed. Please try again.',
      }));
    }
  }, []);

  const register = useCallback(
    async (name: string, email: string, _password: string) => {
      setState(prev => ({...prev, isLoading: true, error: null}));
      try {
        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setState({
          isAuthenticated: true,
          user: {id: '1', name, email},
          isLoading: false,
          error: null,
        });
      } catch {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Registration failed. Please try again.',
        }));
      }
    },
    [],
  );

  const logout = useCallback(() => {
    setState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,
    });
  }, []);

  return {...state, login, logout, register};
}
