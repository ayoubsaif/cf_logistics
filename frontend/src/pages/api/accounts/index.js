import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { get } from "@/utils/RequestFactory";

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
        const response = await get(`${process.env.NEXT_PUBLIC_API}/accounts`, { headers })
        const data = await response;
        res.status(200).json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}