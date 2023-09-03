
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API;

// get orders by account and store id
export const getAllOrders = (accountId, storeId, accessToken, page) => {
    try {
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'AccountId': accountId
        };
        const params = {
            'page': page
        };
        return axios.get(`/api/orders/${storeId}`, { headers, params });
    }
    catch (err) {
        console.log(err);
    }
};

export const getOpenOrders = (accountId, storeId, accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'accountid': accountId
    };
    const params = {
        'status': 'open'
    };
    return axios.get(`${API_URL}/api/orders/${storeId}`, { headers, params });
}
