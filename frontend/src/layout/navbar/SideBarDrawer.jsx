import React from "react";
import {
  Box,
  Drawer,
  Text,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Menu,
  MenuItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
  Icon,
  Flex,
  Heading,
  ButtonGroup,
  Button,
  Spacer,
  VStack
} from "@chakra-ui/react";
import NextLink from "next/link";

import {
  RiStoreLine as StoreIcon,
  RiMailLine as ContactIcon,
  RiSunLine as SunIcon,
  RiMoonLine as MoonIcon,
  RiTruckLine as TruckIcon
} from "react-icons/ri";

import { useColorMode } from "@chakra-ui/color-mode";

const Stores = (props) => {
  const { stores } = props;
  return (
    <Accordion allowToggle>
      <AccordionItem border="none">
        <AccordionButton p={4} pl={6}>
          <Icon as={StoreIcon} mr={2} boxSize={5} />
          <Box flex="1" textAlign="left" alignItems="center" fontWeight="bold">
            Cambia de tienda
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel p={0}>
          <Menu>
            {stores?.items?.map((store) => (
              <MenuItem
                key={store?.id}
                as={NextLink}
                href={"/" + store.storeId + "/orders/open"}
                p={4}
                pl={8}
              >
                {store?.name}
              </MenuItem>
            ))}
          </Menu>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

const MenuItemButton = ({ children, icon, ...props }) => {
  return (
    <Button p={4} pl={6} display='flex' justifyContent='flex-start' {...props} >
      {icon && <Icon as={...icon} mr={2} boxSize={5} />}
      {children}
    </Button>
  );
};

export default function SideBarDrawer({ siteConfig, isOpen, onClose }) {
  const { colorMode, toggleColorMode } = useColorMode();

  const handleMode = () => {
    toggleColorMode();
  };

  return (
    <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px" as={Heading} size="md">
          {siteConfig?.title}
          {siteConfig?.store &&
            <Text fontSize='medium' fontWeight="light">{siteConfig?.store?.name}</Text>
          }
        </DrawerHeader>
        <DrawerBody p={0}>
          <Flex justifyContent="space-between" flexDir="column" height="100%">
            {siteConfig?.stores &&
              <Box overflow="hidden" height="100%" overflowX="hidden" overflowY="auto">
                <Stores {...siteConfig} />
              </Box>
            }
            <Divider />
            <VStack align='strech' gap='0'>
              <MenuItemButton
                as={NextLink}
                href="/carriers"
                icon={TruckIcon}
                variant="ghost"
                w='full'
              >Transportistas</MenuItemButton>
              <Divider /> 
              <Flex>
                <MenuItemButton
                  as={NextLink}
                  href="mailto:info@crasforum.com"
                  icon={ContactIcon}
                  variant="link"
                >Contacto</MenuItemButton>
                <Spacer />
                <MenuItemButton onClick={handleMode}
                  icon={colorMode == 'dark' ? SunIcon : MoonIcon}
                  variant="link">
                </MenuItemButton>
              </Flex>
              <Text fontSize='xs' p="1" color="gray.300" textAlign="center">
                © {new Date().getFullYear()} {siteConfig?.title}
              </Text>
            </VStack>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
