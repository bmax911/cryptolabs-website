import { createContext, useState, useContext, useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(netlifyIdentity.currentUser());
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Initialize Netlify Identity
        netlifyIdentity.init();

        // Set user on login
        const handleLogin = (user) => {
            setUser(user);
            const jwt = user.token.access_token;
            setToken(jwt);
            // The widget automatically handles localStorage
        };
        netlifyIdentity.on('login', handleLogin);

        // Clear user on logout
        const handleLogout = () => {
            setUser(null);
            setToken(null);
        };
        netlifyIdentity.on('logout', handleLogout);

        // Handle initial user load
        netlifyIdentity.on('init', (user) => {
            setUser(user);
            if (user) {
                const jwt = user.token.access_token;
                setToken(jwt);
            }
        });

        return () => {
            netlifyIdentity.off('login', handleLogin);
            netlifyIdentity.off('logout', handleLogout);
        };
    }, []);

    const login = () => {
        netlifyIdentity.open('login');
    };

    const signup = () => {
        netlifyIdentity.open('signup');
    };

    const logout = () => {
        netlifyIdentity.logout();
    };

    const isAuthenticated = () => {
        return !!netlifyIdentity.currentUser();
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, signup, isAuthenticated, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
