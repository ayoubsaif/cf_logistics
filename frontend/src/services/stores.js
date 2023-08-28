import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API;

export function getStores() {
    try {
        return axios.get(`${API_URL}/api/stores`);
    }
    catch (error) {
        console.log(error);
    }
}

