import React, { useState, useEffect } from "react";
import {
  Text, Icon, Flex, InputGroup, InputLeftElement, InputRightElement, Input, Spacer, Box, Button, filter, useToast
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

const OrdersPage = ({ siteConfig, orders, store, stores, session }) => {
  const router = useRouter();
  const { storeId } = router.query;
  siteConfig = {
    ...siteConfig,
    store,
    stores
  }
  const [filterText, setFilterText] = useState('');
  const [filterIsLoading, setFilterIsLoading] = useState(false);
  const filterInput = React.useRef(null);
  const { data, isLoading, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ['OpenOrders', storeId],
    queryFn: ({ pageParam = 1 }) => getOpenOrders(session.user.accountId,
      storeId, session.user.accessToken, pageParam, filterText),
    initialData: orders,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage?.currentPage + 1;
      return nextPage <= lastPage?.totalPages ? nextPage : undefined;
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

  console.log("~~ data: ", data);

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

  if (session) {
    try {
      const { storeId } = context.params;
      const store = await getStore(session.user.accessToken, session.user?.accountId, storeId);
      const stores = await getStores(session.user.accessToken, session.user.accountId);
      const orders = await getOpenOrders(session.user.accountId, storeId, session.user.accessToken);
      return {
        props: {
          orders: orders,
          store: store,
          stores: stores.data,
          session,
        },
      };
    } catch (error) {
      return {
        props: {
          orders: [],
          store: {},
          stores: [],
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
}
