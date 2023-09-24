import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export default async function handler(req, res) {
    try {
        const session = await getServerSession(req, res, authOptions)
        if (!session) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        // Extract parameters from the URL
        const { storeId, page } = req.query;

        // Construct the backend API URL with or without the 'page' query parameter
        let backendApiUrl = `http://localhost:80/api/orders/${storeId}`;

        // If 'page' parameter is provided, include it in the URL
        if (page) {
            backendApiUrl += `?page=${page}`;
        }

        // Your logic to make the request to the backend API
        // You can use libraries like axios or fetch to make the request
        // Example using fetch:
        const backendResponse = await fetch(backendApiUrl, {
            method: req.method, // Forward the HTTP method (GET, POST, etc.)
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.user?.accessToken}`,
                'AccountId': '64b267fcd4f08'
                // Forward other headers if needed
            },
            body: req.method === 'POST' ? JSON.stringify(req.body) : undefined, // Forward request body for POST requests
        });

        if (!backendResponse.ok) {
            console.error(backendResponse.json());
            throw new Error('Failed to fetch data from the backend API');
        }

        // Parse the response from the backend API and send it to the client
        const backendData = await backendResponse.json();
        res.status(backendResponse.status).json(backendData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
