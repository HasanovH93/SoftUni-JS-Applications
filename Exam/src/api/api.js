import { getUserData, setUserData, clearUserData } from "../util.js";

const hostname = 'http://localhost:3030';

async function request(url, options) {
    try {
        const res = await fetch(hostname + url, options);


        if (res.ok == false) {
            const error = await res.json();
            throw new Error(error.message);
        };

        if (res.status == 204) {
            return res;
        } else {
            return res.json();
        }

    } catch (err) {
        alert(err.message);
        throw err;
    }
}

function createOpt(method = 'get', data) {

    const options = {
        method,
        headers: {}
    };

    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    };

    const userData = getUserData();

    if (userData) {
        options.headers['X-Authorization'] = userData.token
    }

    return options;
}

export async function get(url) {
    return request(url, createOpt());
}

export async function post(url, data) {
    return request(url, createOpt('post', data));
}

export async function put(url, data) {
    return request(url, createOpt('put', data));
}

export async function del(url) {
    return request(url, createOpt('delete'));
}

export async function login(email, password) {
    const result = await post('/users/login', { email, password });

    const userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    };

    setUserData(userData);

    return result;
}

export async function register(email, password) {
    const result = await post('/users/register', { email, password });

    const userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    };

    setUserData(userData);

    return result;
}

export async function logout() {
    get('/users/logout');
    clearUserData();
}





