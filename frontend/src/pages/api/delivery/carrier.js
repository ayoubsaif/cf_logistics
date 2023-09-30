// handle active method to backend with put method to /api/delivery/[carrierId]/active

import axios from "axios";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export default async (req, res) => {
    
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const {
        method,
        body
    } = req;

    switch (method) {
        case "POST":
            try {
                const response = await axios.post(
                    `${process.env.NEXT_APP_API_URL}/api/delivery/carrier`, body,
                    {
                        headers: {
                            AccountId: req.headers.accountid,
                            Authorization: `Bearer ${session?.user?.accessToken}`,
                        },
                    }
                );
                res.status(200).json(response.data);
            } catch (error) {
                res.status(400).json({ error });
            }
            break;
        default:
            res.setHeader("Allow", ["POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};