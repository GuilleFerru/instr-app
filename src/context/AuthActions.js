export const LoginRequest = (userCredentials) => {
    return {
        type: 'LOGIN_REQUEST'
    }
}

export const LoginSuccess = (user) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: user
    }
}

export const LoginFailure = () => {
    return {
        type: 'LOGIN_FAILURE',
    }
}