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
  Button,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import NextLink from "next/link";

import {
  RiStoreLine as StoreIcon,
  RiMailLine as ContactIcon,
} from "react-icons/ri";

const menuItems = [
  {
    label: "Contacto",
    url: "mailto:info@crasforum.com",
    icon: ContactIcon,
  },
];

import { useColorMode } from "@chakra-ui/color-mode";
import ColorModeAccordion from "@/layout/theme/components/ColorModeAccordion";

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
                key={store.store}
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

const MenuItems = () => {
  return (
    <Menu>
      {menuItems?.map((navItem) => (
        <>
          <MenuItemButton key={navItem.label} {...navItem} />
          <Divider />
        </>
      ))}
    </Menu>
  );
};

const MenuItemButton = ({ label, children, url, icon }) => {
  return (
    <>
      {children ? (
        <Accordion allowToggle>
          <AccordionItem border="none">
            <AccordionButton p={4} pl={6}>
              <Box flex="1" textAlign="left">
                {label}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel p={0}>
              {children.map((child) => (
                <MenuItem
                  key={child.label}
                  as={NextLink}
                  href={url ?? "#"}
                  p={4}
                  pl={8}
                  fontWeight="bold"
                >
                  {child.label}
                </MenuItem>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ) : (
        <MenuItem p={4} pl={6} as={NextLink} href={url ?? "#"} fontWeight="bold">
          {icon && <Icon as={...icon} mr={2} boxSize={5} />}
          {label}
        </MenuItem>
      )}
    </>
  );
};

const SocialButton = ({ label, children, ...attributes }) => {
  return (
    <Button
      {...attributes}
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  );
};

export default function SideBarDrawer({ siteConfig, isOpen, onClose }) {
  const { colorMode, toggleColorMode } = useColorMode()
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
            <Box>
              <MenuItems />
            </Box>
            <Box>
              <ColorModeAccordion />
            </Box>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
