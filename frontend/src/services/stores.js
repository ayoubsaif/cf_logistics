import RequestFactory from "@/utils/RequestFactory";

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
    try {
        return await RequestFactory(`${API_URL}/api/store/${storeId}`, {
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