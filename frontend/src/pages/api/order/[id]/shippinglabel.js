import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

// method to get shipping label from backend api /api/order/:id/shippinglabel and return base64 string
export const getShippingLabel = async (req, res) => {
    try {
        const session = await getServerSession({ req, ...authOptions });
        const { accountId, accessToken } = session.user;
        
        const { id } = req.query;
        const order = getShippingLabel(accountId, id, accessToken);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        const shippingLabel = await getShippingLabelFromShippo(order);
        return res.status(200).json(shippingLabel);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}