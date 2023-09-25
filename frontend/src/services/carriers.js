import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API;

export function getCarriers(accountId, accessToken) {
    try {
        return axios.get(`${API_URL}/api/delivery`, {
            headers: {
                AccountId: accountId,
                Authorization: `Bearer ${accessToken}`,
            },
        });
    }
    catch (error) {
        console.log(error);
    }
}

export function activeCarrier(accountId, accessToken, carrierId) {
    try {
        return axios.put(`/api/delivery/${carrierId}/active`, {}, {
            headers: {
                AccountId: accountId,
                Authorization: `Bearer ${accessToken}`,
            },
        });
    }
    catch (error) {
        console.log(error);
    }
}

export function getCarrierById(accountId, accessToken, carrierId) {
    try {
        return axios.get(`${API_URL}/api/delivery/${carrierId}`, {
            headers: {
                AccountId: accountId,
                Authorization: `Bearer ${accessToken}`,
            },
        });
    }
    catch (error) {
        console.log(error);
    }
}