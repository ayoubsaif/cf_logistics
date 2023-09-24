import React from "react";
import { SimpleGrid, Flex, Heading } from "@chakra-ui/react";
import CarriersList from "@/components/carriers/CarriersList";
import EmptyIlustration from "@/components/ilustrations/empty";

const CarriersListContainer = ({data}) => {

  return (
    <SimpleGrid columns={1} gap={2} alignContent="center">
      {data && data?.length > 0 ? (
       <CarriersList carriers={data} />
      ) : (
        <Flex spacing={2} alignItems="center" justifyContent="center" color="fg.muted" flexDirection={['column', 'row']}>
          <EmptyIlustration height={280} />
          <Heading variant="md" textAlign="center">
            No se han encontrado transportistas
          </Heading>
        </Flex>
      )}
    </SimpleGrid>
  );
};

export default CarriersListContainer;