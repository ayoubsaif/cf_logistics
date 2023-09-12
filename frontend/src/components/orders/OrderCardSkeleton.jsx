import React from "react";
import {
    Box,
    Flex,
    Spacer,
    Stack,
    Skeleton,
} from "@chakra-ui/react";

const OrderCardSkeleton = () => {
    return (
        <Box p={3}
            borderWidth={1} borderRadius="md"
            boxShadow="sm">
            <Stack spacing={2}>
                <Flex spacing={2} w="full">
                    <Skeleton height='20px' w="40%" />
                    <Spacer w="full"/>
                    <Skeleton height='20px' w="20%" borderRadius="full"/>
                </Flex>
                <Stack w="full">
                    <Skeleton height='15px' w="30%" />
                    <Skeleton height='15px' w="25%" />
                </Stack>
            </Stack>
        </Box>
    );
};

export default OrderCardSkeleton;
