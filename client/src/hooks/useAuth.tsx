/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '@/types/User'; 
import type { LoginData, RegisterData } from '@/types/Auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sztywno zdefiniowany użytkownik do testów
const MOCK_USER: User = {
  user_id: 1,
  email: "nauczyciel@test.pl",
  first_name: "Jan",
  last_name: "Nauczyciel",
  role: "teacher",
  created_at: new Date().toISOString()
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(MOCK_USER);
  const [isLoading] = useState(false);

  const login = async () => {
    console.log("Symulacja logowania...");
    setUser(MOCK_USER);
  };

  const register = async () => {
    console.log("Symulacja rejestracji...");
    setUser(MOCK_USER);
  };

  const logout = async () => {
    console.log("Wylogowano (symulacja - odśwież stronę aby wrócić)");
    setUser(null);
  };

  const value = { user, isLoading, login, register, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};