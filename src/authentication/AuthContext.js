import React from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false, // Por defecto el usuario no está logueado
    userEmail: "", // Por defecto el usuario no tiene nombre
    onLogin: () => { }, // Función vacía por defecto (se sobreescribe en el Provider)
    onLogout: () => { }, // Función vacía por defecto (se sobreescribe en el Provider)
});

export default AuthContext;