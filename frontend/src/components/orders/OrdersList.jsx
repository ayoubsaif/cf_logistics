import React from 'react'
import { SimpleGrid, Text, HStack, Spinner } from '@chakra-ui/react';
import OrderCard from './OrderCard';
import OrderCardSkeleton from './OrderCardSkeleton';

const OrdersList = React.forwardRef(({ isLoading, orders, hasMore }, ref) => {
    return (
        <SimpleGrid columns={1} gap={2} alignContent="center">
            {isLoading ? (
                [...Array(5)].map((e, i) => <OrderCardSkeleton key={i} />)
            ) :
                orders && orders?.map((order, index) => (
                    <React.Fragment key={index}>
                        <OrderCard order={order} />
                        {index === orders.length - 1 && hasMore && (
                            <HStack spacing={4} py={4} m="0 auto">
                                <Spinner
                                    ref={...ref}
                                    speed='0.65s'
                                    color='brand.500'
                                />
                                <Text>Cargando más pedidos...</Text>
                            </HStack>
                        )}
                    </React.Fragment>
                ))
            }
        </SimpleGrid>
    )
});

export default OrdersList;