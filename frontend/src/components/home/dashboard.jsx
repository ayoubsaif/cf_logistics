import { Card, CardBody, Flex, Text } from "@chakra-ui/react";

const CardComponent = ({ title, value }) => {
  return (
    <Card variant="outline" w={250}>
      <CardBody>
        <Text fontSize="xl" fontWeight="bold" mb={2}>
          {value}
        </Text>
        <Text fontSize="sm" color="gray.500">
          {title}
        </Text>
      </CardBody>
    </Card>
  );
};

const Dashboard = () => {
  const ordersPending = 5; // Replace with actual data
  const ordersCompletedToday = 10; // Replace with actual data
  const totalOrdersLast7Days = 25; // Replace with actual data

  return (
    <Flex gap={10} py={10}>
      <CardComponent title="Orders Pending" value={ordersPending} />
      <CardComponent title="Orders Completed Today" value={ordersCompletedToday} />
      <CardComponent title="Total Orders Last 7 Days" value={totalOrdersLast7Days} />
    </Flex>
  );
};

export default Dashboard;
