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
        console.error(error);
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
        console.error(error);
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
        console.error(error);
    }
}

export function updateCarrier(accountId, accessToken, carrierId, data) {
    try {
        return axios.put(`/api/delivery/${carrierId}`, data, {
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

export function createCarrier(accountId, accessToken, data) {
    try {
        return axios.post(`/api/delivery/carrier`, data, {
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

export function deleteCarrier(accountId, accessToken, carrierId) {
    try {
        return axios.delete(`/api/delivery/${carrierId}`, {
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