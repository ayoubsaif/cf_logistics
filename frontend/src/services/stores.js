import RequestFactory from "@/utils/RequestFactory";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API;

export function getStores(accessToken, accountId) {
    try {
        return RequestFactory(`${API_URL}/api/stores`, {
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

export const getStore = async (accessToken, accountId, storeId) => {
    const response = await fetch(`${API_URL}/api/store/${storeId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accountid: accountId,
        },
    });
    if (!response.ok) {
        const error = await response.json();
        console.error("Error Store",error.message);
        throw new Error(error.message);
    }
    return response.json();
}