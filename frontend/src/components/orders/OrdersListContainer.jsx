import React, { useRef, useEffect } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import OrderCard from "./OrderCard";
import OrderCardSkeleton from "./OrderCardSkeleton";

const OrdersListContainer = ({ data, isLoading, hasNextPage, fetchNextPage, filter }) => {
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
          fetchNextPage();
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
    <SimpleGrid columns={1} gap={2} alignContent="center">
      {data?.pages?.map((page, index) => (
        <React.Fragment key={index}>
          {page?.items && page?.items?.map((order, index) => (
            <OrderCard key={index} order={order} filter={filter} />
          ))}
        </React.Fragment>
      ))}
      {hasNextPage && !isLoading && (
        <OrderCardSkeleton ref={lastOrderRef}/>
      )}
    </SimpleGrid>
  );
};

export default OrdersListContainer;
