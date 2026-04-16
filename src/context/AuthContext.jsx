import React, { createContext, useState, useContext, useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('elavate_current_user');
    if (loggedInUser) setCurrentUser(JSON.parse(loggedInUser));
  }, []);

  const register = (firstName, lastName, email, password) => {
    const users = JSON.parse(localStorage.getItem('elavate_users') || '[]');
    
    if (users.find(u => u.email === email)) {
      throw new Error("An account with this email already exists.");
    }
    
    const newUser = { id: Date.now(), firstName, lastName, email, password };
    users.push(newUser);
    
    localStorage.setItem('elavate_users', JSON.stringify(users));
    setCurrentUser(newUser);
    localStorage.setItem('elavate_current_user', JSON.stringify(newUser));
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('elavate_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error("Invalid email or password.");
    }
    
    setCurrentUser(user);
    localStorage.setItem('elavate_current_user', JSON.stringify(user));
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      const user = {
        id: result.user.uid,
        firstName: result.user.displayName?.split(' ')[0] || 'User',
        lastName: result.user.displayName?.split(' ')[1] || '',
        email: result.user.email
      };

      setCurrentUser(user);
      localStorage.setItem('elavate_current_user', JSON.stringify(user));
      
    } catch (error) {
      throw new Error("Google sign in failed: " + error.message);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('elavate_current_user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, register, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};