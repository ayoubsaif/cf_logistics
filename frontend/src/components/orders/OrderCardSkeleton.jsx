import React from "react";
import {
    Box,
    Flex,
    Spacer,
    Stack,
    Skeleton,
    Spinner,
    Text,
} from "@chakra-ui/react";

export default React.forwardRef(({props}, ref) => {
    return (
        <Box p={3}
            borderWidth={1} borderRadius="md"
            boxShadow="sm"
            position="relative"
            ref={ref}
        >
            {/* Skeleton Container */}
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

            {/* Spinner and Loading Text */}
            <Flex
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                alignItems="center"
                justifyContent="center"
            >
                <Spinner size="lg" color="brand.500" />
                <Text ml={2} fontWeight="bold">
                    Cargando...
                </Text>
            </Flex>
        </Box>
    )
});
