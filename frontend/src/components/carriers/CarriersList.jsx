import React from 'react'
import CarrierCard from './CarrierCard';

const CarriersList = React.forwardRef(({carriers}, ref) => {
    return (
        carriers && carriers?.map((carrier, index) => (
            <CarrierCard key={index} carrier={carrier} />
        ))

    )
});

export default CarriersList;