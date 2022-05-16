const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                user: null,
                socket: null,
                overDueRoutines: null,
                isFetching: true,
                error: false
            };
        case 'LOGIN_SUCCESS':
            return {
                user: action.payload,
                socket: action.socket,
                overDueRoutines: action.overDueRoutines,
                isFetching: false,
                error: false,

            };
        case 'LOGIN_FAILURE':
            return {
                user: null,
                socket: null,
                overDueRoutines: null,
                isFetching: false,
                error: true
            };
        case 'LOGOUT_SUCCESS':
            return {
                user: null,
                socket: null,
                overDueRoutines: null,
                isFetching: false,
                error: false
            };
        default:
            return state;
    }
}

export default AuthReducer;