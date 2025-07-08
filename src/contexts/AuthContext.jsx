
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for Netlify Identity to be loaded
    const checkIdentity = () => {
      if (window.netlifyIdentity) {
        const identity = window.netlifyIdentity;
        setUser(identity.currentUser());
        setIsLoading(false);
        identity.on('login', user => {
          setUser(user);
          identity.close();
        });
        identity.on('logout', () => setUser(null));
        // Cleanup
        return () => {
          identity.off('login');
          identity.off('logout');
        };
      } else {
        setTimeout(checkIdentity, 100);
      }
    };
    checkIdentity();
    // eslint-disable-next-line
  }, []);

  const login = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.open('login');
    }
  };

  const signup = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.open('signup');
    }
  };

  const logout = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.logout();
    }
  };

  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
