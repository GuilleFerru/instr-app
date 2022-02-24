import axios from 'axios';

export const options = {
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
};

export const axiosPut = (url, body) => {
    axios.put(url, body, options).then(_res => {}).catch(err => {console.log(err)});
}