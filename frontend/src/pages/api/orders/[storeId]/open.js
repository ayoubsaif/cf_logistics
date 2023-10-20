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

        // Extract [storeId]
        const { storeId, page, filter } = req.query;
        const options = {
            headers: {
                Authorization: `Bearer ${session.user.accessToken}`,
                Accountid: session.user.account.id
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
        const url = `${process.env.NEXT_PUBLIC_API}/orders/${storeId}/open?${searchParams.toString()}`;
        const response = await get(url, options);
        // await response and console log currentPage from response body
        const data = await response;
        if (data) {
            res.status(200).json(data);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
