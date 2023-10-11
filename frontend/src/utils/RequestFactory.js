import axios from 'axios';

export default async function RequestFactory(url, { method = 'get', data, params, headers }) {
    try {
        const response = await axios({
            method,
            url,
            data,
            params,
            headers
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            throw new Error(error.response.data.message);
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error('No response received from the server');
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error('Error setting up the request');
        }
    }
}

// RequestFactory.post
export async function post(url, data, { params, headers }) {
    return RequestFactory(url, { method: 'post', data, params, headers });
}

// RequestFactory.get
export async function get(url, { params, headers }) {
    return RequestFactory(url, { method: 'get', params, headers });
}

// RequestFactory.put
export async function put(url, data, { params, headers }) {
    return RequestFactory(url, { method: 'put', data, params, headers });
}

// RequestFactory.delete
export async function del(url, { params, headers }) {
    return RequestFactory(url, { method: 'delete', params, headers });
}

// RequestFactory.patch
export async function patch(url, data, { params, headers }) {
    return RequestFactory(url, { method: 'patch', data, params, headers });
}
