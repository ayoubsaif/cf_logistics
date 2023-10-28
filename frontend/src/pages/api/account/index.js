import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { post } from "@/utils/RequestFactory";

export default async function handler(req, res) {

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
                const response = await post(
                    `${process.env.NEXT_PUBLIC_API}/account`, body,
                    {
                        headers: {
                            Accountid: req.headers.accountid,
                            Authorization: `Bearer ${session.user.accessToken}`,
                        },
                    }
                );
                const data = await response;
                res.status(200).json(data);
            } catch (error) {
                console.error('Error:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
            break;
        default:
            res.setHeader("Allow", ["POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}