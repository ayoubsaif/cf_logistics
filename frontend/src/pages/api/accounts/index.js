import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import axios from "axios";

export default async function handler(req, res) {
    try {
        const session = await getServerSession(req, res, authOptions)
        if (!session) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const { accessToken } = session?.user;
        const headers = {
            'Authorization': `Bearer ${accessToken}`
        };
        const response = await axios.get(`${process.env.NEXT_APP_API_URL}/api/accounts`, { headers })
        if (!response.status === 200) {
            console.error(response.json());
            throw new Error('Failed to fetch data from the backend API');
        }
        const data = await response?.data;
        res.status(response.status).json(data);

        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}