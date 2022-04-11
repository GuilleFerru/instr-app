import {createContext, useEffect, useReducer } from 'react';
import { setToken } from '../Services/Axios';
import AuthReducer from './AuthReducer';


const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isFetching: false,
    error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthComponentContext = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user));
        state.user && setToken(state.user.token);
    }, [state.user]);

    return (
        <AuthContext.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch,          
        }}>
            {children}
        </AuthContext.Provider>
    );
}