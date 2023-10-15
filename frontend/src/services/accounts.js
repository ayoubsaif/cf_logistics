import axios from 'axios';
const API_URL = process.env.NEXT_PUBLIC_API;

export const getAccounts = (accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`
    };
    axios.get(`${API_URL}/accounts`, { headers })
        .then((res) => {return res;})
        .catch((err) => {return err.message});
}