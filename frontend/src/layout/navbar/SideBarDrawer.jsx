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
  Heading
} from "@chakra-ui/react";
import NextLink from "next/link";

import {
  RiStoreLine as StoreIcon,
  RiMailLine as ContactIcon,
} from "react-icons/ri";

const menuItems = [
  {
    label: "Contacto",
    url: "mailto:contacto@crasforum.com",
    icon: ContactIcon,
  },
];

const stores = [
  {
    name: "Tienda 1",
    store: "store1",
  },
  {
    name: "Tienda 2",
    store: "store2",
  },
  {
    name: "Tienda 3",
    store: "store3",
  },
];

const Shops = () => {
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
            {stores.map((store) => (
              <MenuItem
                key={store.store}
                as={NextLink}
                href={"/" + store.store + "/orders/open"}
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

export default function SideBarDrawer({ siteConfig, isOpen, onClose }) {
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
            <Box overflow="hidden" height="100%" overflowX="hidden" overflowY="auto">
              <Shops />
            </Box>
            <Divider />
            <Box>
              <MenuItems />
            </Box>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
