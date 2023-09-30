import React, { useRef } from "react";
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
  Link,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { getCarrierLogo } from "@/components/carriers/carriersData";
import { deleteCarrier } from "@/services/carriers";
import { motion } from "framer-motion";
import NextLink from "next/link";

import {
  RiDeleteBin7Line as DeleteIcon,
  RiEditBoxLine as EditIcon,
  RiMore2Fill as MenuIcon,
} from "react-icons/ri";



const CarrierCard = React.forwardRef((props, ref) => {
  const { carrier, toggleActive, token } = props;

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

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const router = useRouter();
  const toast = useToast();

  const deleteCarrierById = async (id) => {
    const deleteOne = await deleteCarrier('64b267fcd4f08', token, id);
    if (deleteOne?.status === 200) {
      toast({
        title: "Transportista Eliminado",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        router.reload();
      }, 500);
    } else {
      toast({
        title: "Algo ha ido mal",
        description: `No se ha podido eliminar el transportista. Por favor, inténtalo de nuevo más tarde.`,
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
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
                <MenuItem 
                  icon={<Icon as={DeleteIcon} boxSize={5} />}
                  isDisabled={isActive}
                  onClick={onOpen}
                >
                  Eliminar
                </MenuItem>
              </MenuList>
            </Menu>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Eliminar Transportista
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    ¿ Estás seguro ? No podrás deshacer esta acción.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancelar
                    </Button>
                    <Button colorScheme='red' onClick={() => deleteCarrierById(carrier.id)} ml={3}>
                      Eliminar
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Flex>
        </Flex>
      </Box>
    </motion.div>
  );
});

export default CarrierCard;