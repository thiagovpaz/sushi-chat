import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
} from 'react';

import { api } from '../services/api';

interface IUser {
  id: string;
  name: string;
  email: string;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: IUser;
  signIn: (credentials: ISignInCredentials) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
}

interface IAuthState {
  user: IUser;
  token: string;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('sushi-chat:token');
    const user = localStorage.getItem('sushi-chat:user');

    if (token && user) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(
    async ({ email, password }: ISignInCredentials) => {
      setLoading(true);

      try {
        const response = await api.post('/auth/signin', { email, password });

        const { token, user } = response.data;

        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        localStorage.setItem('sushi-chat:token', token);
        localStorage.setItem('sushi-chat:user', JSON.stringify(user));

        setData({ token, user });
      } catch (error: unknown) {
        throw new Error(error as string);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('sushi-chat:token');
    localStorage.removeItem('sushi-chat:user');

    setData({} as IAuthState);
  }, []);

  const context = useMemo<IAuthContextData>(
    () => ({
      user: data.user,
      signIn,
      signOut,
      isLoading: loading,
    }),
    [data.user, loading, signIn, signOut],
  );

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

const useAuth = (): IAuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Must be inside a provider.');
  }

  return context;
};

export { AuthProvider, useAuth };
