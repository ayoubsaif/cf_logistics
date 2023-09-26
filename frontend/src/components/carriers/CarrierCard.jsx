import React from "react";
import {
  Box,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Icon,
  Tooltip,
  VStack,
  Switch,
  Link
} from "@chakra-ui/react";
import { getCarrierLogo } from "@/components/carriers/carriersData";
import { motion } from "framer-motion";
import NextLink from "next/link";

import {
  RiEditBoxLine as EditIcon,
  RiMore2Fill as MenuIcon,
} from "react-icons/ri";



const CarrierCard = React.forwardRef((props, ref) => {
  const { carrier, toggleActive } = props;

  const {
    name,
    deliveryType,
    username,
    password,
    isActive
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

  const MaskPassword = ({ password }) => {
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
              <MaskPassword password={password} />
            </VStack>
          </Flex>
          <Flex justifyContent='space-between' alignContent="center" h={20}>
            <Switch
              p={2}
              colorScheme="brand"
              isChecked={isActive} isReadOnly={isActive}
              onChange={() => toggleActive(carrier.id)}
            />
            <Menu >
              <MenuButton
                as={IconButton}
                aria-label='Options'
                variant="transparent"
                icon={<Icon as={MenuIcon} boxSize={5} />}
              />
              <MenuList>
                <MenuItem 
                  icon={<Icon as={EditIcon} boxSize={5} />} 
                  as={NextLink}
                  href={`/carriers/${carrier.id}/edit`}
                >
                  Editar
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </motion.div>
  );
});

export default CarrierCard;