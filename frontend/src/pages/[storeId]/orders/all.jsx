import {
  SimpleGrid, Text, Icon, Flex, InputGroup, InputLeftElement, Input, Spacer, Box
} from "@chakra-ui/react";
import OrderCard from "@/components/orders/OrderCard";
import Layout from "@/layout/Layout";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import OrdersTabs from "@/layout/navbar/pageTab";

import {
  RiStoreLine as StoreIcon,
} from "react-icons/ri";
import { SearchIcon } from "@chakra-ui/icons";
import { getStores } from "@/services/stores";

const orders = [
  {
    id: 2,
    storeId: 1,
    orderOrigin: "miinto",
    orderNumber: "11401061982190",
    orderDate: "2023-08-15 23:22:35",
    orderStatus: "done",
    customerName: "Graciela Fdez Fdez",
    street: "Calle López de La Torre 4 Bar La Torre",
    streetComplement: null,
    postalCode: 33120,
    city: "Pravia Pravia",
    state: "Asturias",
    country: "España",
    contactPhone: "31604903895",
    contactMobile: null,
    contactEmail: "email@email.com",
    shipping: {
      shippingMethod: "Correos",
      trackingNumber: "PQ856C0710027820144566Q",
      trackingUrl: "https://www.correos.es/es/es/herramientas/localizador/envios/detalle?tracking-number=PQ856C0710027820144566Q",
      date: "2023-08-15 23:22:35",
      urlLabel: "https://assets.trendico.es/pdf/correos_PQ856C071002782E_PQ856C0710027820144566Q.pdf",
    }
  },
  {
    id: 2,
    storeId: 1,
    orderOrigin: "zalando",
    orderNumber: "11401061982191",
    orderDate: "2023-08-15 23:22:35",
    orderStatus: "done",
    customerName: "Graciela Fdez Fdez",
    street: "Calle López de La Torre 4 Bar La Torre",
    streetComplement: null,
    postalCode: 33120,
    city: "Pravia Pravia",
    state: "Asturias",
    country: "España",
    contactPhone: "31604903895",
    contactMobile: null,
    contactEmail: "email@email.com",
    shipping: {
      shippingMethod: "Correos",
      trackingNumber: "PQ856C0710027820144566Q",
      trackingUrl: "https://www.correos.es/es/es/herramientas/localizador/envios/detalle?tracking-number=PQ856C0710027820144566Q",
      date: "2023-08-15 23:22:35",
      urlLabel: "https://assets.trendico.es/pdf/correos_PQ856C071002782E_PQ856C0710027820144566Q.pdf",
    }
  },
  {
    id: 2,
    storeId: 1,
    orderOrigin: "amazon",
    orderNumber: "11401061982192",
    orderDate: "2023-08-15 23:22:35",
    orderStatus: "done",
    customerName: "Graciela Fdez Fdez",
    street: "Calle López de La Torre 4 Bar La Torre",
    streetComplement: null,
    postalCode: 33120,
    city: "Pravia Pravia",
    state: "Asturias",
    country: "España",
    contactPhone: "31604903895",
    contactMobile: null,
    contactEmail: "email@email.com",
    shipping: {
      shippingMethod: "Correos",
      trackingNumber: "PQ856C0710027820144566Q",
      trackingUrl: "https://www.correos.es/es/es/herramientas/localizador/envios/detalle?tracking-number=PQ856C0710027820144566Q",
      date: "2023-08-15 23:22:35",
      urlLabel: "https://assets.trendico.es/pdf/correos_PQ856C071002782E_PQ856C0710027820144566Q.pdf",
    }
  },
  {
    id: 2,
    storeId: 1,
    orderOrigin: "miravia",
    orderNumber: "11401061982193",
    orderDate: "2023-08-15 23:22:35",
    orderStatus: "done",
    customerName: "Graciela Fdez Fdez",
    street: "Calle López de La Torre 4 Bar La Torre",
    streetComplement: null,
    postalCode: 33120,
    city: "Pravia Pravia",
    state: "Asturias",
    country: "España",
    contactPhone: "31604903895",
    contactMobile: null,
    contactEmail: "email@email.com",
    shipping: {
      shippingMethod: "Correos",
      trackingNumber: "PQ856C0710027820144566Q",
      trackingUrl: "https://www.correos.es/es/es/herramientas/localizador/envios/detalle?tracking-number=PQ856C0710027820144566Q",
      date: "2023-08-15 23:22:35",
      urlLabel: "https://assets.trendico.es/pdf/correos_PQ856C071002782E_PQ856C0710027820144566Q.pdf",
    }
  },
  {
    id: 2,
    storeId: 1,
    orderOrigin: "hipercalzado",
    orderNumber: "11401061982194",
    orderDate: "2023-08-18 17:36:35",
    orderStatus: "done",
    customerName: "Graciela Fdez Fdez",
    street: "Calle López de La Torre 4 Bar La Torre",
    streetComplement: null,
    postalCode: 33120,
    city: "Pravia Pravia",
    state: "Asturias",
    country: "España",
    contactPhone: "31604903895",
    contactEmail: "email@email.com",
    shipping: {
      shippingMethod: "Correos",
      trackingNumber: "PQ856C0710027820144566Q",
      trackingUrl: "",
      date: "2023-08-15 23:22:35",
      urlLabel: "https://assets.trendico.es/pdf/correos_PQ856C071002782E_PQ856C0710027820144566Q.pdf",
    }
  },
  {
    id: 2,
    storeId: 1,
    orderOrigin: "hipercalzado",
    orderNumber: "11401061982195",
    orderDate: "2023-08-20 14:00:00",
    orderStatus: "done",
    customerName: "Graciela Fdez Fdez",
    street: "Calle López de La Torre 4 Bar La Torre",
    streetComplement: null,
    postalCode: 33120,
    city: "Pravia Pravia",
    state: "Asturias",
    country: "España",
    contactPhone: "31604903895",
    contactEmail: "email@email.com",
    shipping: {
      shippingMethod: "Correos",
      trackingNumber: "PQ856C0710027820144566Q",
      trackingUrl: "https://www.correos.es/es/es/herramientas/localizador/envios/detalle?tracking-number=PQ856C0710027820144566Q",
      date: "2023-08-15 23:22:35",
      urlLabel: null,
    }
  },
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
        title="Todos los pedidos"
        description="Todos los pedidos"
        canonical={process.env.NEXT_PUBLIC_SITE_URL + router.pathname}
      />
      <Layout title="Orders" siteConfig={siteConfig} page={1}>
        <Flex gap={2} alignItems="center" mb={5} flexDirection={['column', 'row']}>
          <Flex gap={2}>
            <Icon as={StoreIcon} boxSize={5} />
            <Text fontSize="md">
              {store?.name}
            </Text>
          </Flex>
          <Spacer />
          <Box>
            <InputGroup colorScheme="brand">
              <InputLeftElement pointerEvents='none'>
                <SearchIcon color='gray.300' />
              </InputLeftElement>
              <Input type='text' placeholder='Buscar pedido' focusBorderColor='brand.400'/>
            </InputGroup>
          </Box>
        </Flex>
        <SimpleGrid columns={1} gap={4} >
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
  const stores = await getStores(session?.user?.accessToken);
  if (session) {
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
