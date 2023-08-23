import React, {useState, ReactNode, useContext} from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    token: string | null;
    login: (username: string, jwtToken: string) => void;
    logout: () => void;
    username: string | null;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    const login = (username: string, jwtToken: string) => {
        setIsLoggedIn(true);
        setToken(jwtToken);
        setUsername(username);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, token, login, logout, username }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
