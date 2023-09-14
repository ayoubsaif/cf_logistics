import React, { useState, useEffect, useRef } from "react";
import { useInfiniteQuery } from 'react-query'; // Import React Query
import {
  Text, Icon, Flex, InputGroup, InputLeftElement, Input, Spacer, Box, Heading
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
import OrdersList from "@/components/orders/OrdersList";
import TasksCompleteIlustration from "@/components/ilustrations/tasksComplete";
import { set } from "date-fns";

const OrdersPage = ({ siteConfig, store, stores, token }) => {
  siteConfig = {
    ...siteConfig,
    store,
    stores
  }
  const router = useRouter();
  const lastOrderRef = useRef(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // Create a query function to fetch a page of orders
  const fetchPageOfOrders = async ({ pageParam }) => {
    try {
      const response = await getAllOrders('64b267fcd4f08', store?.id, token, pageParam);
      const { items, totals, limit } = response?.data || {};
  
      // You can also set up pagination information for later use
      return items || [];
    } catch (error) {
      throw error;
    }
  };
  

  // Use React Query's useInfiniteQuery for infinite scrolling
  const Query = useInfiniteQuery(
    'orders', // Query key
    ({ signal, pageParam: page = 1 }) => fetchPageOfOrders({ page, limit, signal }), // Fetch function
    {
      refetchOnWindowFocus: true,
      retry: 2,
      getNextPageParam: (lastPage, pages) => {
        if (Math.ceil(lastPage.totals / limit) > pages.length) {
          return page + 1; // Return the next page number
        }
        return undefined;
      },
    }
  );
  console.log('Query:', Query);
  const { data, hasNextPage, fetchNextPage, isLoading, error } = Query;
  const orders = data?.pages.flat() || [];
  useEffect(() => {
    // Listen for changes in the "query" object, which includes "storeId"
    const fetchOrdersOnRouteChange = () => {
      Query.refetch(); // Fetch more data on route change
    };

    router.events.on('routeChangeComplete', fetchOrdersOnRouteChange);

    // Cleanup the event listener when the component unmounts
    return () => {
      router.events.off('routeChangeComplete', fetchOrdersOnRouteChange);
    };
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, // Trigger when 10% of the last order card is visible
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage) {
        // Add sleep time of 3 seconds to simulate loading
        setTimeout(() => {
          setPage((prevPage) => prevPage + 1);
          fetchNextPage(); // Enable and fetch more data
        }, 1500);
      }
    }, options);

    if (lastOrderRef.current) {
      observer.observe(lastOrderRef.current);
    }

    return () => {
      if (lastOrderRef.current && !isLoading) {
        observer.unobserve(lastOrderRef.current);
      }
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <>
      <NextSeo
        title={`Pedidos abiertos - ${store?.name}`}
        description={`Pedidos abiertos - ${process.env.NEXT_PUBLIC_SITE_NAME}`}
        canonical={process.env.NEXT_PUBLIC_SITE_URL + router.pathname}
      />
      <Layout title="Orders" siteConfig={siteConfig} page={0}>
        <Flex gap={2} alignItems="center" mb={5} flexDirection={['column', 'row']}>
          <Flex gap={2} alignContent="center" alignItems="center">
            <Icon as={StoreIcon} boxSize={8} />
            <Text fontSize='medium' fontWeight="light">
              {store?.name}
            </Text>
          </Flex>
          <Spacer />
          {orders &&
            <Box>
              <InputGroup colorScheme="brand">
                <InputLeftElement pointerEvents='none'>
                  <SearchIcon color='gray.300' />
                </InputLeftElement>
                <Input type='text' placeholder='Buscar pedido' focusBorderColor='brand.400' />
              </InputGroup>
            </Box>
          }
        </Flex>
        {orders || isLoading ?
          <OrdersList orders={orders} isLoading={isLoading} hasMore={hasNextPage} ref={lastOrderRef} />
          :
          <Flex spacing={2} alignItems="center" justifyContent="center" color="fg.muted" flexDirection={['column', 'row']}>
            <TasksCompleteIlustration height={280} />
            <Box>
              <Heading variant="md" textAlign="center">
                ¡Todo listo!
              </Heading>
              <Text variant="md" textAlign="center">
                No hay pedidos abiertos ahora mismo
              </Text>
            </Box>
          </Flex>
        }
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
