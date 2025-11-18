import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { users } from '../data/users.js';

const AuthContext = createContext(undefined);
const STORAGE_KEY = 'slooze-auth-user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.email && parsedUser.role) {
          setUser(parsedUser);
        }
      }
    } catch (error) {
      console.error('Failed to restore auth user from storage', error);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    return userData;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
