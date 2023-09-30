
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API;

// get orders by account and store id
export const getAllOrders = (accountId, storeId, accessToken, page, filter) => {
    try {
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'AccountId': accountId
        };
        const params = {
            'page': page,
        };
        if (filter) {
            params['filter'] = filter;
        }
        return axios.get(`/api/orders/${storeId}`, { headers, params });
    }
    catch (err) {
        console.error(err);
    }
};

export const getOpenOrders = (accountId, storeId, accessToken, page) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'AccountId': accountId
    };
    const params = {
        'status': 'open',
        'page': page
    };
    axios.get(`/api/orders/${storeId}`, { headers, params })
    .then((res) => {
        console.log(res);
        return {
            ok: true,
            data: res.data,
            error: null
        };
    })
    .catch((err) => {
        console.log(err);
        return {
            ok: false,
            error: err.message
        }
    });
}

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