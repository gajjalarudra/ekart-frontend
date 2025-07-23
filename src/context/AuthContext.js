import { createContext, useState, } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const name = localStorage.getItem('name');
    return name ? { name } : null;
  });

  const login = (name, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
    setUser({ name });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
