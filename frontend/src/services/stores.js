import { get } from "@/utils/RequestFactory";

const API_URL = process.env.NEXT_PUBLIC_API;

export const getStores = async (accessToken, accountId) => {
    try {
        return await get(`${API_URL}/stores`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accountid: accountId,
            },
        });
    }
    catch (error) {
        console.error(error);
    }
}

export const getStore = async (accessToken, accountId, storeId) => {
    try {
        return await get(`${API_URL}/store/${storeId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accountid: accountId,
            },
        });
    }
    catch (error) {
        console.error(error);
    }
}