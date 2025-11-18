import { createContext, useCallback, useState } from 'react';
import { users } from '../data/users.js';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(undefined);
const STORAGE_KEY = 'slooze-auth-user';

const readStoredUser = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storedUser = window.localStorage.getItem(STORAGE_KEY);
    if (!storedUser) {
      return null;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser && parsedUser.email && parsedUser.role) {
      return parsedUser;
    }

    window.localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to restore auth user from storage', error);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => readStoredUser());

  const login = useCallback((email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const matchedUser = users.find(
      (account) => account.email === normalizedEmail && account.password === password,
    );

    if (!matchedUser) {
      throw new Error('Invalid email or password');
    }

    const userData = { email: matchedUser.email, role: matchedUser.role };
    setUser(userData);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    }
    return userData;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

