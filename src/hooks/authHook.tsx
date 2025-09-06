import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";
import type { ReactNode } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
  emailVerifiedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  role?: string;
  token: string;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storagedUser = localStorage.getItem("@Info:user");

    if (storagedUser) {
      const parsedUser = JSON.parse(storagedUser) as User;
      setUser(parsedUser);
      api.defaults.headers.common.Authorization = `Bearer ${parsedUser.token}`;
    }

    setLoading(false);
  }, []);

  async function signIn(email: string, password: string) {
    try {
      setLoading(true);

      const response = await api.post("/login", { email, password });

      const { access_token, user: userData } = response.data;

      // Adiciona token nos headers
      api.defaults.headers.common.Authorization = `Bearer ${access_token}`;

      const newUser: User = {
        ...userData,
        token: access_token,
        createdAt: userData.created_at,
        updatedAt: userData.updated_at,
        emailVerifiedAt: userData.email_verified_at,
      };

      localStorage.setItem("@Info:user", JSON.stringify(newUser));
      setUser(newUser);
    } catch (error: any) {
      throw new Error(
        error?.response?.data?.message ?? "Não foi possível autenticar"
      );
    } finally {
      setLoading(false);
    }
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem("@Info:user");
    delete api.defaults.headers.common.Authorization;
  }

  return (
    <AuthContext.Provider value={{ loading, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
