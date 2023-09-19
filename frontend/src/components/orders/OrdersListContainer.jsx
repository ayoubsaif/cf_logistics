import React, { useRef, useEffect } from "react";
import { SimpleGrid, HStack, Spinner, Text, Flex, Heading, Divider } from "@chakra-ui/react";
import OrdersList from "@/components/orders/OrdersList";
import EmptyIlustration from "@/components/ilustrations/empty";

const OrdersListContainer = ({ data, isLoading, hasNextPage, loadMoreOrders }) => {
  const lastOrderRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, // Trigger when 10% of the last order card is visible
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage) {
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
      if (lastOrderRef.current && !isLoading) {
        observer.unobserve(lastOrderRef.current);
      }
    };
  }, [hasNextPage, loadMoreOrders]);

  return (
    <SimpleGrid columns={1} gap={2} alignContent="center">
      {data?.pages && data?.pages?.length > 0 ? (
        <>
          {data.pages.map((page, pageIndex) => (
            <OrdersList key={pageIndex} orders={page.data.items} isLoading={isLoading} hasMore={hasNextPage} />
          ))}

          {hasNextPage && (
            <HStack spacing={4} py={4} m="0 auto">
              <Spinner speed="0.65s" color="brand.500" />
              <Text>Cargando más pedidos...</Text>
            </HStack>
          )}
        </>
      ) : (
        <Flex spacing={2} alignItems="center" justifyContent="center" color="fg.muted" flexDirection={['column', 'row']}>
          <EmptyIlustration height={280} />
          <Heading variant="md" textAlign="center">
            No se han encontrado pedidos
          </Heading>
        </Flex>
      )}
    </SimpleGrid>
  );
};

export default OrdersListContainer;
