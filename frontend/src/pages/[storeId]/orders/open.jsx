import {
  SimpleGrid, Text, Icon, Stack
} from "@chakra-ui/react";
import OrderCard from "@/components/orders/OrderCard";
import Layout from "@/layout/Layout";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import {
  RiStoreLine as StoreIcon,
} from "react-icons/ri";

import { getStores } from "@/services/stores";

const orders = [
  {
    id: 2,
    storeId: 1,
    orderOrigin: "zalando",
    orderNumber: "11401061982190",
    orderDate: "2023-08-15 23:22:35",
    orderStatus: "open",
    customerName: "Graciela Fdez Fdez",
    street: "Calle López de La Torre 4 Bar La Torre",
    streetComplement: null,
    postalCode: 33120,
    city: "Pravia Pravia",
    state: "Asturias",
    country: "España",
    contactPhone: "31604903895",
    contactMobile: null,
    contactEmail: "email@email.com"
  }
];

const OrdersPage = ({ siteConfig, store, stores }) => {
  const router = useRouter();
  siteConfig = {
    ...siteConfig,
    store,
    stores
  }
  return (
    <>
      <NextSeo
        title="Pedidos abiertos"
        description="Pedidos abiertos"
        canonical={process.env.NEXT_PUBLIC_SITE_URL + router.pathname}
      />
      <Layout title="Orders" siteConfig={siteConfig} page={0}>
        <Stack direction="row" mb={4} spacing={2}>
          <Icon as={StoreIcon} boxSize={5} />
          <Text fontSize="md">
            {store?.name}
          </Text>
        </Stack>
        <SimpleGrid columns={1} gap={4} w="full">
          {orders.map((order) => (
            <OrderCard key={order.orderNumber} order={order} w="full" />
          ))}
        </SimpleGrid>
      </Layout>
    </>
  );
};

export default OrdersPage;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const { storeId } = context.params;
  const store = {
    id: 1,
    name: "Tienda 1",
  }
  if (session) {
    const stores = await getStores(session?.user?.accessToken);
    return {
      props: {
        store,
        stores: stores?.data,
      },
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
