// components/OrdersTabs.js
import React from 'react';
import { useRouter } from 'next/router';
import { Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react';

import NextLink from 'next/link';

const OrdersTabs = ({ active }) => {
  const router = useRouter();
  const { storeId } = router.query;
  return (
    <Tabs defaultIndex={active}
      colorScheme="brand"
      size={['sm', 'md']}>
      <TabList>
        <Tab as={NextLink} href={`/${storeId}/orders/open`}>Pedidos abiertos</Tab>
        <Tab as={NextLink} href={`/${storeId}/orders/all`}>Todos los pedidos</Tab>
      </TabList>
      <TabPanels>
        {/* Panels not needed here, as they are defined in page components */}
      </TabPanels>
    </Tabs>
  );
};

export default OrdersTabs;
