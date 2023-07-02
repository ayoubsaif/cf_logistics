import { Box, Flex, Heading, Text } from '@chakra-ui/react';

const OrderCard = ({ order }) => {
  const { orderNumber, clientName, address, subtotal, date, origin } = order;

  return (
    <Box p={4} borderWidth={1} borderRadius="md" boxShadow="sm">
      <Heading as="h2" size="md" mb={2}>Order #{orderNumber}</Heading>
      <Flex justifyContent="space-between" mb={2}>
        <Text>{clientName}</Text>
        <Text>{address}</Text>
      </Flex>
      <Text mb={2}>Subtotal: ${subtotal}</Text>
      <Text>Date: {date}</Text>
      <Text>Origin: {origin}</Text>
    </Box>
  );
};

export default OrderCard;
