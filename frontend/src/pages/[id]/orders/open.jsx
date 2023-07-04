import { Box, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import OrderCard from "@/components/orders/OrderCard";
import Layout from "@/layout/Layout";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const orders = [
  {
    orderNumber: "123456",
    clientName: "John Doe",
    address: "123 Main St, Anytown, USA",
    subtotal: 100,
    date: "2023-07-01",
    origin: "Amazon",
  },
  // Add more orders here...
];

const OrdersPage = ({ siteConfig, menuItems }) => {
  return (
    <Layout title="Orders" siteConfig={siteConfig} menuItems={menuItems}>
      <Container maxW="container.lg" py={8}>
        <Heading as="h1" mb={4}>
          Open Orders
        </Heading>
        <SimpleGrid columns={1} gap={4} w="full">
          {orders.map((order) => (
            <OrderCard key={order.orderNumber} order={order} w="full" />
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  );
};

export default OrdersPage;

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    return {
      props: {},
    };
  } else {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
}
