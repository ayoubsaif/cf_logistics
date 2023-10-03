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
                'Authorization': `Bearer ${session.user.accessToken}`,
                'AccountId': session.user.accountId
            },
            params: {}
        }
        if (page) {
            options.params['page'] = page;
        }
        if (filter) {
            options.params['filter'] = filter;
        }
        console.log('options:', options);
        const response = await fetch(`${process.env.NEXT_APP_API_URL}/api/orders/${storeId}/all`, options);
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        res.status(response.status).json(await response.json());
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
