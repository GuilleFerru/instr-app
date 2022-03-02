import axios from 'axios';

export const options = {
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
};

export const axiosPut = (url, body) => {
    axios.put(url, body, options).then(_res => _res.status).catch(err => { console.log(err) });
};

export const axiosPost = (url, body) => {
    axios.post(url, body, options).then(_res => _res.status).catch(err => { console.log(err) });
};

export const axiosDelete = (url, data) => {
    axios.delete(url, { data: { data } }, options).then(_res => _res.status).catch(err => { console.log(err) });
}