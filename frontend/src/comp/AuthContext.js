import React, { createContext, useState, useContext, useEffect } from 'react';

// Créer le contexte
const AuthContext = createContext();

// Composant Provider pour envelopper votre application
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Vérifier si l'utilisateur est déjà connecté (par exemple, depuis localStorage)
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
        setUser(storedUser);
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

// Hook pour utiliser le contexte
export const useAuth = () => {
    return useContext(AuthContext);
};
