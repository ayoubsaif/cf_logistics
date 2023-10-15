import RequestFactory, { get } from "@/utils/RequestFactory";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API;

export async function getCarriers(accountId, accessToken) {
    return await get(`${API_URL}/api/delivery`, {
        headers: {
            Accountid: accountId,
            Authorization: `Bearer ${accessToken}`,
        },
    })
}

export function activeCarrier(accountId, accessToken, carrierId) {
    try {
        return axios.put(`/api/delivery/${carrierId}/active`, {}, {
            headers: {
                Accountid: accountId,
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
        return get(`${API_URL}/api/delivery/${carrierId}`, {
            headers: {
                Accountid: accountId,
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
        return get(`/api/delivery/${carrierId}`, data, {
            headers: {
                Accountid: accountId,
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
                Accountid: accountId,
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
                Accountid: accountId,
                Authorization: `Bearer ${accessToken}`,
            },
        });
    }
    catch (error) {
        console.error(error);
    }
}