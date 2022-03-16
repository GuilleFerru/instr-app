import axios from 'axios';

export const options = {
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
};

export const axiosGet = async (url) => {
    try {
        const _res = await axios.get(url, options);
        return _res.data;
    } catch (err) {
        console.log(err);
    }
}

export const axiosPut = (url, body) => {
    axios.put(url, body, options).then(_res => _res.status).catch(err => { console.log(err) });
};

export const axiosPost = (url, body) => {
    axios.post(url, body, options).then(_res => _res.status).catch(err => { console.log(err) });
};

export const axiosDelete = (url, data) => {
    axios.delete(url, { data: { data } }, options).then(_res => _res.status).catch(err => { console.log(err) });
}