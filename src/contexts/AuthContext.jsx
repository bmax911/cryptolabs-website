import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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

        // Set up Netlify Identity event listeners
        const setupNetlifyIdentity = () => {
            if (window.netlifyIdentity) {
                // Handle login event
                window.netlifyIdentity.on('login', (user) => {
                    console.log('User logged in:', user);
                    setUser(user);
                    if (user.token) {
                        const jwt = user.token.access_token;
                        setToken(jwt);
                        localStorage.setItem('netlify_jwt', jwt);
                    }
                    window.netlifyIdentity.close();
                    // Redirect to dashboard
                    window.location.href = '/dashboard';
                });

                // Handle logout event
                window.netlifyIdentity.on('logout', () => {
                    console.log('User logged out');
                    setUser(null);
                    setToken(null);
                    localStorage.removeItem('netlify_jwt');
                    window.location.href = '/';
                });

                // Handle signup event
                window.netlifyIdentity.on('signup', (user) => {
                    console.log('User signed up:', user);
                    setUser(user);
                    if (user.token) {
                        const jwt = user.token.access_token;
                        setToken(jwt);
                        localStorage.setItem('netlify_jwt', jwt);
                    }
                    window.netlifyIdentity.close();
                    // Redirect to dashboard
                    window.location.href = '/dashboard';
                });

                // Check for existing user
                const currentUser = window.netlifyIdentity.currentUser();
                if (currentUser) {
                    setUser(currentUser);
                    if (currentUser.token) {
                        const jwt = currentUser.token.access_token;
                        setToken(jwt);
                        localStorage.setItem('netlify_jwt', jwt);
                    }
                }
            }
        };

        // Try to set up immediately or wait for script to load
        if (window.netlifyIdentity) {
            setupNetlifyIdentity();
        } else {
            // Wait for netlify identity to load
            const checkForNetlify = setInterval(() => {
                if (window.netlifyIdentity) {
                    setupNetlifyIdentity();
                    clearInterval(checkForNetlify);
                }
            }, 100);

            // Clean up interval after 10 seconds
            setTimeout(() => clearInterval(checkForNetlify), 10000);
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
            } else {
                // Manual logout if netlify identity not available
                setUser(null);
                setToken(null);
                localStorage.removeItem('netlify_jwt');
                window.location.href = '/';
            }
        } catch (error) {
            console.warn('Logout error:', error);
            // Fallback manual logout
            setUser(null);
            setToken(null);
            localStorage.removeItem('netlify_jwt');
            window.location.href = '/';
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
