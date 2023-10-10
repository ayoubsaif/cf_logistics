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
        query: { carrierId },
        method,
        body
    } = req;

    switch (method) {
        case "PUT":
            try {
                const response = await axios.put(
                    `${process.env.NEXT_PUBLIC_API}/api/delivery/${carrierId}`, body,
                    {
                        headers: {
                            Accountid: req.headers.accountid,
                            Authorization: `Bearer ${session.user.accessToken}`,
                        },
                    }
                );
                res.status(200).json(response.data);
            } catch (error) {
                res.status(400).json({ error });
            }
            break;
        case "DELETE":
            try {
                const response = await axios.delete(
                    `${process.env.NEXT_PUBLIC_API}/api/delivery/${carrierId}`,
                    {
                        headers: {
                            Accountid: req.headers.accountid,
                            Authorization: `Bearer ${session.user.accessToken}`,
                        },
                    }
                );
                res.status(200).json(response.data);
            } catch (error) {
                res.status(400).json({ error });
            }
            break;
        default:
            res.setHeader("Allow", ["PUT", "DELETE"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};