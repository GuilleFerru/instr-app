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
            'Authorization': token
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

export const axiosPut = (url, body) => {
    try {
        return axios.put(url, body, options());
    } catch (err) {
        console.log(err);
    }
    // axios.put(url, body, options()).then(_res => _res.status).catch(err => { console.log(err) });
};

export const axiosPost = (url, body) => {
    axios.post(url, body, options()).then(_res => _res.status).catch(err => { console.log(err) });
};

export const axiosDelete = (url, data) => {
    axios.delete(url, { data: { data } }, options()).then(_res => _res.status).catch(err => { console.log(err) });
}

export const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
        console.log(baseUrl)
        const res = await axios.post(`${baseUrl}/login`, userCredential);
        
        const socket = io(baseUrl.replace('/api', ""), { transports: ['websocket'], auth: { token: `Bearer ${res.data.token}` } });
        console.log(socket);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data, socket : socket });
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err, socket: err });
    }
};