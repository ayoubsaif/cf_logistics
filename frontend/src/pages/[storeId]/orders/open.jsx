import React, { useState, useEffect } from "react";
import {
  Text, Icon, Flex, InputGroup, InputLeftElement, InputRightElement, Input, Spacer, Box, Button, filter
} from "@chakra-ui/react";
import Layout from "@/layout/Layout";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import {
  RiStoreLine as StoreIcon,
} from "react-icons/ri";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { getStores, getStore } from "@/services/stores";
import { getOpenOrders } from "@/services/orders";
import { useInfiniteQuery } from 'react-query';
import OrdersListContainer from "@/components/orders/OrdersListContainer";

const OrdersPage = ({ siteConfig, orders, store, stores, token }) => {
  siteConfig = {
    ...siteConfig,
    store,
    stores
  }
  // Step 1: Add a state variable to store the filter text
  const [filterText, setFilterText] = useState('');
  const [filterIsLoading, setFilterIsLoading] = useState(false);
  const filterInput = React.useRef(null);
  const router = useRouter();
  const { data, isLoading, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ['OpenOrders', filterText],
    queryFn: ({ pageParam = 1 }) => getOpenOrders('64b267fcd4f08', store?.storeId, token, pageParam, filterText),
    initialData: orders,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage?.data?.currentPage + 1;
      return nextPage <= lastPage?.data?.totalPages ? nextPage : undefined;
    },
  });

  const loadMoreOrders = () => {
    fetchNextPage();
  };

  const handleFilter = (event) => {
    setTimeout(() => {
      setFilterIsLoading(true);
      setFilterText(event.target.value);
      setFilterIsLoading(false);
    }, 2000);
  };

  const clearFilterText = () => {
    setFilterText('');
    filterInput.current.value = '';
    filterInput.current.focus();
  };

  useEffect(() => {
    refetch();
  }, [filterText, router.query]);

  return (
    <>
      <NextSeo
        title={`Pedidos abiertos - ${store?.name}`}
        description="Pedidos abiertos"
        canonical={process.env.NEXT_PUBLIC_SITE_URL + router.pathname}
      />
      <Layout title="Pedidos abiertos" siteConfig={siteConfig} page={0}>
        <Flex gap={2} alignItems="center" mb={5} flexDirection={['column', 'row']}>
          <Flex gap={2} alignContent="center" alignItems="center">
            <Icon as={StoreIcon} boxSize={8} />
            <Text fontSize='medium' fontWeight="light">
              {store?.name}
            </Text>
          </Flex>
          <Spacer />
          <Box>
            <InputGroup colorScheme="brand">
              <InputLeftElement pointerEvents='none'>
                <SearchIcon color='gray.300' />
              </InputLeftElement>
              <Input type='text'
                placeholder='Buscar pedido'
                focusBorderColor='brand.400'
                onChange={handleFilter}
                ref={filterInput}
              />
              {filterText && (
                <InputRightElement
                  as={Button}
                  size='sm'
                  variant="ghost"
                  borderRadius="full"
                  onClick={clearFilterText}
                >
                  <CloseIcon />
                </InputRightElement>
              )}
            </InputGroup>
          </Box>
        </Flex>
        <OrdersListContainer
          data={data}
          isLoading={isLoading}
          hasNextPage={hasNextPage}
          loadMoreOrders={loadMoreOrders}
          filter={filterText}
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

  const orders = await getOpenOrders('64b267fcd4f08', storeId, session?.user?.accessToken);
  if (session) {
    return {
      props: {
        orders: orders?.data,
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
