import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Start with false to avoid blocking

    useEffect(() => {
        // Minimal auth check - don't block rendering
        try {
            const storedToken = localStorage.getItem('netlify_jwt');
            if (storedToken) {
                setToken(storedToken);
            }
        } catch (error) {
            console.warn('Could not check stored token:', error);
        }
    }, []);

    const login = () => {
        try {
            if (window.netlifyIdentity) {
                window.netlifyIdentity.open('login');
            } else {
                alert('Please refresh the page and try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login service unavailable. Please refresh the page.');
        }
    };

    const signup = () => {
        try {
            if (window.netlifyIdentity) {
                window.netlifyIdentity.open('signup');
            } else {
                alert('Please refresh the page and try again.');
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('Signup service unavailable. Please refresh the page.');
        }
    };

    const logout = () => {
        try {
            if (window.netlifyIdentity) {
                window.netlifyIdentity.logout();
            }
        } catch (error) {
            console.warn('Logout error:', error);
        } finally {
            setUser(null);
            setToken(null);
            localStorage.removeItem('netlify_jwt');
        }
    };

    const isAuthenticated = () => {
        return !!(user || token);
    };

    const value = {
        user,
        login,
        logout,
        signup,
        isAuthenticated,
        token,
        isLoading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        // Fallback instead of throwing error
        return {
            user: null,
            login: () => {},
            logout: () => {},
            signup: () => {},
            isAuthenticated: () => false,
            token: null,
            isLoading: false
        };
    }
    return context;
};
