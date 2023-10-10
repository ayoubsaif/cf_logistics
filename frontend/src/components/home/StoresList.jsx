import React from 'react'
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react'

export default function StoresList({ stores }) {
  return (
    <SimpleGrid gap={2}>
    {stores?.items.map((store) => (
        <Box
            key={store.storeId}
            p={5}
            shadow="md"
            borderWidth="1px"
            flex="1"
            borderRadius="md"
        >
            <Heading fontSize="xl">{store.name}</Heading>
            <Text mt={4}>{store.address}</Text>
        </Box>
        ))
    }
    </SimpleGrid>
  )
}
