import React from "react";
import {
  Box,
  Flex,
  Text,
  Stack,
  Icon,
  Tooltip,
  VStack,
  Switch
} from "@chakra-ui/react";
import { getCarrierLogo } from "@/components/carriers/carriersData";
import { motion } from "framer-motion";

const CarrierCard = React.forwardRef((props, ref) => {
  const { carrier, toggleActive } = props;

  const {
    name,
    deliveryType,
    username,
    password,
  } = carrier;

  const carrierInfo = getCarrierLogo(deliveryType);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerDirection: -1
      }
    }
  }

  function MaskPassword({ password }) {
    if (password.length >= 4) {
      const firstTwo = password.slice(0, 2);
      const lastTwo = password.slice(-2);
      const maskedCharacters = '*'.repeat(password.length - 4);
  
      const maskedPassword = `${firstTwo}${maskedCharacters}${lastTwo}`;
  
      return (
        <Tooltip label="Contraseña" borderRadius="md">
          <Text fontSize="xs" cursor='default'>{maskedPassword}</Text>
        </Tooltip>
      )
    } else {
      return (
        <Tooltip label="Contraseña" borderRadius="md">
          <Text Text fontSize="xs" cursor='default'>{password}</Text>
        </Tooltip>
      )
    }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
    >
      <Box bgColor="bg.surface" p={3}
        borderWidth={1} borderRadius="md"
        boxShadow="sm"
        ref={ref}>
        <Flex justifyContent='space-between'>
          <Flex justifyContent='flex-start' gap='5'>
            {carrierInfo && carrierInfo?.icon &&
              <Icon
                as={...carrierInfo?.icon}
                boxSize={20}
                borderRadius='lg'
              />
            }
            <VStack spacing={2} alignItems='flex-start'>
              <Text fontSize="lg" fontWeight="bold">{name}</Text>
              <Tooltip label="Usuario" borderRadius="md">
                <Text fontSize="xs" cursor='default'>{username}</Text>
              </Tooltip>
              <MaskPassword password={password}/>
            </VStack>
          </Flex>
          <Switch 
            colorScheme="brand"
            isChecked={carrier.isActive}
            onChange={() => toggleActive(carrier.id)}
          />
        </Flex>
      </Box>
    </motion.div>
  );
});

export default CarrierCard;