import axios from 'axios';
import io from 'socket.io-client';
const baseUrl = process.env.REACT_APP_API_URL;

let token = null;
export const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
}

const options = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,

        }
    }
}

export const axiosGet = async (url) => {
    try {
        const _res = await axios.get(url, options());
        if (_res.status === 200) {
            return _res.data;
        }
        else {
            return {};
        }
    } catch (err) {
        console.log(err);
    }
}

export const axiosGetBody = async (url, params) => {
    try {
        const _res = await axios.get(url, { params, ...options() });
        if (_res.status === 200) {
            return _res.data;
        }
        else {
            return {};
        }
    } catch (err) {
        console.log(err);
    }
}

export const axiosPostExcel = async (url, body) => {
    try {
        const _res = await axios.post(url, body, { ...options(), responseType: 'blob' });
        if (_res.status === 200) {
            return _res.data;
        }
        else {
            return {};
        }
    } catch (err) {
        console.log(err);
    }
}

export const axiosGetExcel = async (url, params) => {
    try {
        const _res = await axios.get(url, { params, ...options(), responseType: 'blob' });
        if (_res.status === 200) {
            return _res.data;
        }
        else {
            return {};
        }
    } catch (err) {
        console.log(err);
    }
}

export const axiosPut = (url, body) => {
    try {
        return axios.put(url, body, options());
    } catch (err) {
        console.log(err);
    }
    // axios.put(url, body, options()).then(_res => _res.status).catch(err => { console.log(err) });
};

export const axiosPost = async (url, body) => {
    // axios.post(url, body, options()).then(_res => _res.status).catch(err => { console.log(err) });
    try {
        const _res = await axios.post(url, body, options());
        if (_res.status === 200) {
            return _res.data;
        }
        return _res.status;
    } catch (err) {
        return { error: err };
        //return err;
    }


};

export const axiosDelete = (url, data) => {
    axios.delete(url, { data: { data } }, options()).then(_res => _res.status).catch(err => { console.log(err) });
}

export const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
        const res = await axios.post(`${baseUrl}/login`, userCredential);

        if (res.status === 200) {
            const token = res.data.token;;
            const socket = io(baseUrl.replace('/api', ""), {
                extraHeaders: {
                    'x-auth-token': `${token}`
                },
                // transports: ['websocket'],
                transportOptions: {
                    polling: {
                        extraHeaders: {
                            'x-auth-token': `${token}`
                        }
                    }
                }
            });

            //const overDueRoutines = await axios.get(`${baseUrl}/routine/qtyOverdueRoutines`, options());
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data, socket: socket/*, overDueRoutines: overDueRoutines.data*/ });

        }
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err, socket: err/*, overDueRoutines: err*/ });
    }
};