import React, { useState } from 'react'
import { activeCarrier } from '@/services/carriers';
import CarrierCard from './CarrierCard';
import { Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import EmptyIlustration from '@/components/ilustrations/empty';

const CarriersList = React.forwardRef(({ data }, ref) => {
  const { data: session } = useSession();
  const user = session?.user;
  const [carriersList, setCarriersList] = useState(data);

  const toggleActiveCarrier = async (carrierId) => {
    // if carrier is active dont do anything, if not, activate it and deactivate the rest
    const response = await activeCarrier(user?.accountId, user?.accessToken, carrierId);
    if (response) {
      const updatedCarriers = carriersList.map((carrier) => {
        if (carrier.id === carrierId) {
          return {
            ...carrier,
            isActive: true,
          };
        }
        return {
          ...carrier,
          isActive: false,
        };
      });
      setCarriersList(updatedCarriers);
    }
  };

  return (
    <SimpleGrid columns={1} gap={2} alignContent="center">
      {carriersList && carriersList?.length > 0 ? (
        carriersList && carriersList?.map((carrier, index) => (
          <CarrierCard key={index} carrier={carrier} toggleActive={toggleActiveCarrier}/>
        ))
      ) : (
        <Flex spacing={2} alignItems="center" justifyContent="center" color="fg.muted" flexDirection={['column', 'row']}>
          <EmptyIlustration height={280} />
          <Heading variant="md" textAlign="center">
            No se han encontrado transportistas
          </Heading>
        </Flex>
      )}
    </SimpleGrid>

  )
});

export default CarriersList;