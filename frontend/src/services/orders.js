
import axios from 'axios';
import RequestFactory from '../utils/RequestFactory';

const API_URL = process.env.NEXT_PUBLIC_API;

// get orders by account and store id
export const getAllOrders = async (accountId, storeId, accessToken, page, filter) => {
    let options = {
        method : 'get',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accountid: accountId,
        },
        params: {}
    };

    if (page) {
        options.params['page'] = page;
    }
    if (filter) {
        options.params['filter'] = filter;
    }

    try {
        return await RequestFactory(`/api/orders/${storeId}/all`, options);
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

export const getOpenOrders = async (accountId, storeId, accessToken, page, filter) => {
    let options = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accountid: accountId,
        },
        params: {}
    };

    if (page) {
        options.params['page'] = page;
    }
    if (filter) {
        options.params['filter'] = filter;
    }
    
    try {
        const response = await axios.get(`/api/orders/${storeId}/open`, options);
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
};


export const getShippingLabel = (accountId, orderId, accessToken) => {
    try {
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'AccountId': accountId
        };
        return axios.get(`/api/order/${orderId}/shippingLabel`, { headers });
    }
    catch (err) {
        console.error(err);
    }
}