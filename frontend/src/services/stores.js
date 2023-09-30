import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API;

export function getStores(accessToken, accountId) {
    try {
        return axios.get(`${API_URL}/api/stores`, {
                    headers: {
                        AccountId: accountId,
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
    }
    catch (error) {
        console.error(error);
    }
}

export function getStore(accessToken, storeId) {
    try {
        return axios.get(`${API_URL}/api/store/${storeId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
    }
    catch (error) {
        console.error(error);
    }
}