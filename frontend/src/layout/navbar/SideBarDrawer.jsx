import React from "react";
import {
  Box,
  Stack,
  Flex,
  Link,
  Text,
  useColorModeValue,
  useDisclosure,
  Icon,
  Drawer,
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
} from "@chakra-ui/react";
import { BsChevronDown as ChevronDown } from "react-icons/bs";

const MenuItems = ({ menuItems }) => {
  return (
    <Menu>
      {menuItems?.map((navItem) => (
        <MenuItemButton key={navItem.label} {...navItem} />
      ))}
    </Menu>
  );
};

const MenuItemButton = ({ label, children, url }) => {
  return (
    <>
      {children ? (
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {label}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              {children.map((child) => (
                <MenuItem key={child.label}>{child.label}</MenuItem>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ) : (
        <MenuItem spacing={4} p={4}>
          <Text
            fontWeight={600}
            as={Link}
            href={url ?? "#"}
            color={useColorModeValue("gray.600", "gray.200")}
          >
            {label}
          </Text>
        </MenuItem>
      )}
    </>
  );
};

export default function SideBarDrawer({
  siteConfig,
  isOpen,
  onClose,
  menuItems,
}) {
  return (
    <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">{siteConfig?.title}</DrawerHeader>
        <DrawerBody p={0}>
          <MenuItems menuItems={menuItems} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
