import React, { useState, useEffect } from "react";
import {
  Text, Icon, Flex, InputGroup, InputLeftElement, InputRightElement, Input, Spacer, Box, Button, Fade
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
import { getAllOrders } from "@/services/orders";
import { useInfiniteQuery } from 'react-query';
import OrdersListContainer from "@/components/orders/OrdersListContainer";
import EmptyIlustration from "@/components/ilustrations/empty";

const OrdersPage = ({ siteConfig, orders, store, stores, user }) => {
  siteConfig = {
    ...siteConfig,
    store,
    stores
  }

  const [filterText, setFilterText] = useState('');
  const router = useRouter();
  const { storeId } = router.query;
  const { data, isLoading, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ['all-orders', storeId],
    queryFn: ({ pageParam = 1 }) => getAllOrders(user.accountId, storeId, user.accessToken, pageParam, filterText),
    initialData: orders,
    getNextPageParam: (lastPage) => {
      let nextPage = lastPage?.currentPage + 1;
      return nextPage <= lastPage?.totalPages ? nextPage : undefined;
    },
  });

  const handleFilter = (event) => {
    setTimeout(() => {
      setFilterText(event.target.value);
    }, 2000);
  };

  useEffect(() => {
    refetch();
  }, [filterText]);

  const filterInput = React.useRef(null);
  const clearFilterText = () => {
    setFilterText('');
    filterInput.current.value = '';
    filterInput.current.focus();
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
          fetchNextPage={fetchNextPage}
          filter={filterText}
        />
        {data?.pages && (
          data?.pages[0].items.length === 0 && (
            <Fade in={true}>
              <Flex
                w='full'
                h='full'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                gap={2}
              >
                <Icon as={EmptyIlustration} boxSize={60} />
                <Text fontSize='2xl' fontWeight='bold'>No hay pedidos</Text>
                <Text fontSize='md' fontWeight='light'>No se han encontrado pedidos para los filtros aplicados y la tienda seleccionada</Text>
              </Flex>
            </Fade>
          )
        )
        }
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
      const store = await getStore(session.user.accessToken, session.user.accountId, storeId);
      const stores = await getStores(session.user.accessToken, session.user.accountId);
      const orders = await getAllOrders(session.user.accountId, storeId, session.user.accessToken);
      return {
        props: {
          orders,
          store,
          stores,
          user: session.user,
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
