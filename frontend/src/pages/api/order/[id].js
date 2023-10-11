
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(req, res) {
    const { id } = req.query; // get the id parameter from the request query
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
            Accountid: session.user.accountId
        },
    }
    try {
        const url = `${process.env.NEXT_PUBLIC_API}/api/order/${id}`;
        const response = await fetch(url, options);

        if (!response.ok) {
            const error = response.json();
            throw new Error(error.message);
        }
        // await response and console log currentPage from response body
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving order' }); // return an error message if there was an issue retrieving the order
    }
}
