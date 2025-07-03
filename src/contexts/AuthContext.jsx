import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('netlify_jwt'));
    const navigate = useNavigate();

    useEffect(() => {
        // Function to initialize and set up listeners
        const initNetlifyIdentity = () => {
            const netlifyIdentity = window.netlifyIdentity;
            if (netlifyIdentity) {
                // Set initial user state
                const currentUser = netlifyIdentity.currentUser();
                setUser(currentUser);
                if (currentUser) {
                    const storedToken = localStorage.getItem('netlify_jwt');
                    if (storedToken) {
                        setToken(storedToken);
                    }
                }

                // Set user on login
                const handleLogin = (user) => {
                    setUser(user);
                    const jwt = user.token.access_token;
                    setToken(jwt);
                    localStorage.setItem('netlify_jwt', jwt);
                    navigate('/dashboard');
                };
                netlifyIdentity.on('login', handleLogin);

                // Clear user on logout
                const handleLogout = () => {
                    setUser(null);
                    setToken(null);
                    localStorage.removeItem('netlify_jwt');
                };
                netlifyIdentity.on('logout', handleLogout);

                // Handle initial user load
                netlifyIdentity.on('init', (user) => {
                    setUser(user);
                    if (user) {
                        const jwt = user.token.access_token;
                        setToken(jwt);
                        localStorage.setItem('netlify_jwt', jwt);
                    }
                });

                // Initialize the widget
                netlifyIdentity.init();
            }
        };

        // Check if the script has already loaded
        if (window.netlifyIdentity) {
            initNetlifyIdentity();
        } else {
            // If not, wait for the script to load
            document.addEventListener('netlify-identity-widget-init', initNetlifyIdentity);
        }

        return () => {
            // Cleanup listeners on component unmount
            const netlifyIdentity = window.netlifyIdentity;
            if (netlifyIdentity) {
                netlifyIdentity.off('login');
                netlifyIdentity.off('logout');
                netlifyIdentity.off('init');
            }
            document.removeEventListener('netlify-identity-widget-init', initNetlifyIdentity);
        };
    }, [navigate]);

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

    const isAuthenticated = () => {
        return !!window.netlifyIdentity?.currentUser();
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
