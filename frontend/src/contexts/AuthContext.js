import React, { createContext, useState, useEffect } from 'react';
import { login as loginUser } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verificar el token y obtener los datos del usuario
      setUser({ username: 'usuario' }); // Esto debería ser dinámico
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const { token } = await loginUser(username, password);
    localStorage.setItem('token', token);
    setUser({ username });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
