
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState(null);

    const clearAuthError = () => setAuthError(null);

    const login = async (email, password) => {
        setAuthError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (error) {
            setAuthError(error.message);
            console.error("Login Error:", error);
            return { success: false, error: error.message };
        }
    };

    const signup = async (email, password) => {
        setAuthError(null);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (error) {
            setAuthError(error.message);
            console.error("Signup Error:", error);
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        setAuthError(null);
        try {
            await signOut(auth);
            return { success: true };
        } catch (error) {
            setAuthError(error.message);
            console.error("Logout Error:", error);
            return { success: false, error: error.message };
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe; 
    }, []);

    const value = {
        currentUser,
        loading,
        authError,
        clearAuthError,
        login,
        signup,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};