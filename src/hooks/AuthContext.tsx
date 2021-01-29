import React, { createContext, useCallback, useState, useContext } from 'react';

import { api } from '../services/api';

interface AuthState {
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn(credentials: SignInCredentials): Promise<boolean>;
  signOut(): void;
  isAuthorized(): boolean;
  authData: AuthState;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@QualityManagement:token')

    if (token) {
      return { token };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    try {
      const response = await api.post<{ token: string, type: string}>('auth', {
        email,
        password
      });

      const { token } = response.data;

      localStorage.setItem('@QualityManagement:token', token);
      setData({ token });
      return true;
    } catch (err) {
      return false;
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@QualityManagement:token');
    setData({} as AuthState);
  }, []);

  const isAuthorized = useCallback(() => {
    try {
      const token = localStorage.getItem('@QualityManagement:token');

      if(token) {
        return true;
      }

      return false;
    } catch (ex) {
      return false;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authData: data, signIn, signOut, isAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
}


function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };