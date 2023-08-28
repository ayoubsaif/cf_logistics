
import axios from 'axios';

const API_URL = process.env.NEXT_APP_API_HOST;

// get orders by account and store id
export const getOrders = (accountId, storeId) => {
    const headers = {
        'accountid': accountId
    };
    return axios.get(`${API_URL}/api/orders/${storeId}`, { headers });
};

export const getOpenOrders = (accountId, storeId) => {
    const headers = {
        'accountid': accountId
    };
    const params = {
        'status': 'open'
    };
    return axios.get(`${API_URL}/api/orders/${storeId}`, { headers, params });
}
