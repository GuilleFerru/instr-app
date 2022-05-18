import { createContext, useEffect, useReducer } from 'react';
import { setToken } from '../Services/Axios';
import AuthReducer from './AuthReducer';



const INITIAL_STATE = {
    user: null,
    socket: null,
    isFetching: false,
    error: false,

};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthComponentContext = ({ children }) => {

    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        state.user && setToken(state.user.token);
    }, [state.user]);

    return (
        <AuthContext.Provider value={{
            user: state.user,
            socket: state.socket,
            //overDueRoutines: state.overDueRoutines,
            isFetching: state.isFetching,
            error: state.error,
            dispatch,
        }}>
            {children}
        </AuthContext.Provider>
    );
}