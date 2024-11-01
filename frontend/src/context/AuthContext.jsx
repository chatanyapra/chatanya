import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthContextProvider');
    }
    return context;
};

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('chatanya-portfolio') || 'null'));

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};
