import React from 'react'
import { Box, Heading, Icon, SimpleGrid, Text, Flex } from '@chakra-ui/react'
import NextLink from 'next/link'

import {
  RiArrowRightSLine as ArrowRightIcon,
  RiStoreLine as StoreIcon,
} from "react-icons/ri";

export default function StoresList({ stores }) {
  return (
    <Box my={10}>
      <Heading fontSize="2xl" mb={5}>
        <Flex alignItems="center">
          <Icon as={StoreIcon} mr={2} boxSize={8} />
          Tus tiendas
        </Flex>
      </Heading>
      <SimpleGrid gap={2} >
        {stores?.items.map((store) => (
          <NextLink href={`/${store.storeId}/orders/open`} key={store.storeId}>
            <Flex
              bgColor="bg.surface" p={3}
              borderWidth={1}
              borderRadius="md"
              justifyContent="space-between"
              alignItems="center"
              _hover={{ 
                cursor: "pointer",
                boxShadow: "md",
                borderColor: "brand.500",
              }}
              transition="all .1s ease-in"
              >
              <Text>{store.name}</Text>
              <Icon as={ArrowRightIcon} />
            </Flex>
          </NextLink>
        ))
        }
      </SimpleGrid>
    </Box>
  )
}
