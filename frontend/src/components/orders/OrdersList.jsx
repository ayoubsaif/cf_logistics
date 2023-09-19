import React from 'react'
import { SimpleGrid, Text, HStack, Spinner } from '@chakra-ui/react';
import OrderCard from './OrderCard';
import OrderCardSkeleton from './OrderCardSkeleton';

const OrdersList = React.forwardRef(({ isLoading, orders }, ref) => {
    return (
        isLoading ? (
            [...Array(5)].map((e, i) => <OrderCardSkeleton key={i} />)
        ) :
            orders && orders?.map((order, index) => (
                <OrderCard key={index} order={order} />
            ))

    )
});

export default OrdersList;