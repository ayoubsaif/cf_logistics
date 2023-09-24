import React, { useEffect, useRef } from "react";
import {
  Text, Icon, Flex, InputGroup, InputLeftElement, Input, Spacer, Box
} from "@chakra-ui/react";
import Layout from "@/layout/Layout";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import {
  RiStoreLine as StoreIcon,
} from "react-icons/ri";
import { SearchIcon } from "@chakra-ui/icons";
import { getStores, getStore } from "@/services/stores";
import { getAllOrders } from "@/services/orders";
import { useInfiniteQuery } from 'react-query';
import OrdersListContainer from "@/components/orders/OrdersListContainer";

const OrdersPage = ({ siteConfig, store, stores, token }) => {
  siteConfig = {
    ...siteConfig,
    store,
    stores
  }
  const router = useRouter();
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    'orders',
    ({ pageParam = 1 }) => getAllOrders('64b267fcd4f08', store?.storeId, token, pageParam),
    {
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage?.data?.currentPage + 1;
        return nextPage <= lastPage?.data?.totalPages ? nextPage : undefined;
      },
    }
  );

  console.log('isLoading:', isLoading)

  // Call fetchNextPage to load more data
  const loadMoreOrders = () => {
    fetchNextPage();
  };

  return (
    <>
      <NextSeo
        title={`Todos los pedidos - ${store?.name}`}
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
              <Input type='text' placeholder='Buscar pedido' focusBorderColor='brand.400' />
            </InputGroup>
          </Box>
        </Flex>
        <OrdersListContainer
          data={data}
          isLoading={isLoading}
          hasNextPage={hasNextPage}
          loadMoreOrders={loadMoreOrders}
        />
      </Layout>
    </>
  );
};

export default OrdersPage;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const { storeId } = context.params;
  const store = await getStore(session?.user?.accessToken, storeId);
  const stores = await getStores(session?.user?.accessToken);
  if (session) {
    return {
      props: {
        store: store?.data,
        stores: stores?.data,
        token: session?.user?.accessToken,
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
