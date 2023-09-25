import React, { useState } from 'react'
import { activeCarrier } from '@/services/carriers';
import CarrierCard from './CarrierCard';

const CarriersList = React.forwardRef(({carriers, token}, ref) => {
    const [carriersList, setCarriersList] = useState(carriers);

    const toggleActiveCarrier = async (carrierId) => {

        const updatedCarrier = carriersList.map(carrier => {
          if (carrier.id === carrierId) {
            carrier.isActive = !carrier.isActive;
          }
          return carrier;
        });
        setCarriersList(updatedCarrier);
        try {
          activeCarrier('64b267fcd4f08', token, carrierId)
        } catch (error) {
          console.error('Error al actualizar el estado del transportista:', error);
          const revertedCarrier = carriersList.map(carrier => {
            if (carrier.id === carrierId) {
                carrier.isActive = !transportista.isActive;
            }
            return carrier;
          });
          setCarriersList(revertedCarrier);
        }
    };

    return (
        carriersList && carriersList?.map((carrier, index) => (
            <CarrierCard key={index} carrier={carrier} toggleActive={toggleActiveCarrier}/>
        ))

    )
});

export default CarriersList;