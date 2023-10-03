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