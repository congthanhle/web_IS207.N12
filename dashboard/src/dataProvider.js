import { fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

const fetchJson = (url, options = {}) => {
    options.user = {
        authenticated: true,
        // use the token from local storage
        token: localStorage.getItem('token')
    };
    return fetchUtils.fetchJson(url, options);
};
const dataProvider = simpleRestProvider('http://127.0.0.1:8000/api/v1', fetchJson);