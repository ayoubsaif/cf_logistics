import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export default async function handler(req, res) {
    try {
        const session = await getServerSession(req, res, authOptions)
        if (!session) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        // Extract [storeId]
        const { storeId, page, filter } = req.query;
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${session.user.accessToken}`,
                Accountid: session.user.accountId
            },
        }

        // add params using fetch API
        let params = {};
        if (page) {
            params.page = page;
        }
        if (filter) {
            params.filter = filter;
        }
        const searchParams = new URLSearchParams(params);
        const url = `${process.env.NEXT_PUBLIC_API}/api/orders/${storeId}/open?${searchParams.toString()}`;
        const response = await fetch(url, options);
        
        if (!response.ok) {
            const error = response.json();
            throw new Error(error.message);
        }
        // await response and console log currentPage from response body
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
