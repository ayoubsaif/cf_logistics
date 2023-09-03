import React, { useState, useEffect, useRef } from "react";
import {
  SimpleGrid, Text, Icon, Flex, InputGroup, InputLeftElement, Input, Spacer, Box, HStack, Spinner
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
import { getStores, getStore } from "@/services/stores";
import { getAllOrders } from "@/services/orders";

const OrdersPage = ({ siteConfig, store, stores, ordersItems, token }) => {
  siteConfig = {
    ...siteConfig,
    store,
    stores
  }
  const [orders, setOrders] = useState(ordersItems);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const lastOrderRef = useRef(null);

  const loadMoreOrders = async () => {
    try {
      const newOrders = await getAllOrders(
        '64b267fcd4f08',
        store?.id,
        token,
        currentPage + 1 // Request the next page of orders
      );
      const newItems = newOrders?.data?.items;

      if (newItems && newItems.length > 0) {
        // Append the new orders to the existing list
        setOrders((prevOrders) => [...prevOrders, ...newItems]);
        setCurrentPage((prevPage) => prevPage + 1);
      } else {
        // No more items to load
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching more orders:', error);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, // Trigger when 10% of the last order card is visible
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore) {
        // add sleep time 3 seconds to simulate the loading
        setTimeout(() => {
          loadMoreOrders();
        }, 1500);
      }
    }, options);

    if (lastOrderRef.current) {
      observer.observe(lastOrderRef.current);
    }

    return () => {
      if (lastOrderRef.current) {
        observer.unobserve(lastOrderRef.current);
      }
    };
  }, [hasMore, loadMoreOrders]);

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
              <Input type='text' placeholder='Buscar pedido' focusBorderColor='brand.400' />
            </InputGroup>
          </Box>
        </Flex>
        <SimpleGrid columns={1} gap={4} alignContent="center">
          {orders?.map((order, index) => (
            <React.Fragment key={index}>
              <OrderCard order={order} />
              {index === orders.length - 1 && hasMore && (
                <HStack spacing={4} py={4} m="0 auto">
                  <Spinner
                    ref={lastOrderRef}
                    speed='0.65s'
                    color='brand.500'
                  />
                  <Text>Cargando más pedidos...</Text>
                </HStack>
              )}
            </React.Fragment>
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
  const store = await getStore(session?.user?.accessToken, storeId);
  const orders = await getAllOrders('64b267fcd4f08', storeId, session?.user?.accessToken);
  const stores = await getStores(session?.user?.accessToken);
  if (session) {
    return {
      props: {
        store: store?.data,
        stores: stores?.data,
        ordersItems: orders?.data?.items,
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
