import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Create a context for authentication
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null); // Store the decoded user info (if needed)
    const [userId, setUserId] = useState(null); // Store the user ID
    

    // Check login status from localStorage on initial load
    useEffect(() => {        
        const token = localStorage.getItem('jwtToken');
        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded.user_name)
            setUserId(decoded.user_id); // Extract the user ID from the decoded token  
            
        }       
    }, []);
    
     // Function to handle login
    const login = () => {
        localStorage.setItem("isLoggedIn","true")
        setIsLoggedIn(true)
    };
    // Function to handle logout
    const logout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
    };

    // Value to provide to children components
    const value = {
        isLoggedIn,
        user,
        userId,        
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use authentication context
export const useAuth = () => {
    return React.useContext(AuthContext);
};
