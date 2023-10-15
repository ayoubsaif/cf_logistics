import { useEffect, useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import {
  Box,
  Flex,
  IconButton,
  Button,
  Link,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Center,
  Spacer,
  Slide,
  Avatar,
  Text,
} from "@chakra-ui/react";

import {
  RiEqualLine as MenuIcon,
  RiCloseLine as CloseIcon,
} from "react-icons/ri";
import { useSession, signIn, signOut } from "next-auth/react";

import ProfileMenu from "../components/navbar/ProfileMenu";
import useScrollListener from "@/hooks/useScrollListener";
import SideBarDrawer from "../components/navbar/SideBarDrawer";

import OrderTabs from "@/components/navbar/pageTab";
import { AnimatePresence } from "framer-motion";
import { NavBarLogo } from "./Logo";

export function NavBarChild({ siteConfig, page }) {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      w="full"
      bg={useColorModeValue("hsla(0,0%,100%,.8)", "rgba(0,0,0,.8)")}
      backdropFilter={"saturate(180%) blur(5px)"}
      borderBottom={1}
      borderColor={"border.color"}
    >
      <Flex
        minH={"60px"}
        py={2}
        px={4}
        borderBottom={1}
        borderColor="border.color"
        align={"center"}
      >
        <Flex
          flex={1}
          justify={{ base: "center", md: "start" }}
          alignItems={"center"}
        >
          <IconButton
            onClick={onOpen}
            color={useColorModeValue("black", "white")}
            variant="transparent"
            aria-label="Toggle Navigation"
            icon={isOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
          />
          <Link
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
            as={NextLink}
            href="/"
          >
            <NavBarLogo height="50px" />
          </Link>

          <Spacer />

          {session?.user ? (
            <ProfileMenu session={session} signOut={signOut} />
          ) : (
            <Button
              fontSize={"sm"}
              fontWeight={400}
              variant="transparent"
              onClick={() => signIn()}
            >
              <Flex direction={"row"} align={"center"}>
                <Avatar size={"sm"} />
                <Text ml={2} display={{ base: "none", md: "flex" }}>
                  Iniciar sesión
                </Text>
              </Flex>
            </Button>
          )}
        </Flex>
      </Flex>

      {session?.user && page != undefined &&
        <OrderTabs active={page} />
      }

      <SideBarDrawer
        siteConfig={siteConfig}
        onClose={onClose}
        isOpen={isOpen}
      />
    </Box>
  );
}

export default function NavBar(props) {
  const scroll = useScrollListener();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (scroll.lastY === scroll.y) {
      return;
    }
    if (scroll.y > 50 && scroll.y - scroll.lastY > 0) {
      return setVisible(false);
    }
    return setVisible(true);
  }, [scroll.y, scroll.lastY]);

  return (
    <AnimatePresence>
      <Slide direction="top" in={visible} style={{ zIndex: 10 }}>
        <NavBarChild {...props} />
      </Slide>
    </AnimatePresence>
  )
}