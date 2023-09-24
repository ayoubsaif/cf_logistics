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