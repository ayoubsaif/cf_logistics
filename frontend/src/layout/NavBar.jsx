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

import ProfileMenu from "./navbar/ProfileMenu";
import useScrollListener from "@/hooks/useScrollListener";
import SideBarDrawer from "./navbar/SideBarDrawer";

export default function NavBar({ siteConfig }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();
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
    <Slide direction="top" in={visible} style={{ zIndex: 10 }}>
      <Box
        w="full"
        bg={useColorModeValue("hsla(0,0%,100%,.8)", "rgba(0,0,0,.8)")}
        backdropFilter={"saturate(180%) blur(5px)"}
        borderBottom={1}
        borderColor={"border.color"}
      >
        <Flex
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderColor="border.color"
          align={"center"}
        >
          <Flex
            flex={{ base: 1 }}
            justify={{ base: "center", md: "start" }}
            alignItems={"center"}
          >
            <Flex>
              {session?.user && (
                <IconButton
                  onClick={onOpen}
                  color={useColorModeValue("black", "white")}
                  size="lg"
                  variant="transparent"
                  aria-label="Toggle Navigation"
                  icon={
                    isOpen ? (
                      <CloseIcon width={32} height={32} />
                    ) : (
                      <MenuIcon width={32} height={32} />
                    )
                  }
                />
              )}
            </Flex>

            <Spacer display={{ base: "flex", md: "none" }} />

            <Center>
              <Link
                textAlign={useBreakpointValue({ base: "center", md: "left" })}
                fontFamily={"heading"}
                color={useColorModeValue("gray.800", "white")}
                as={NextLink}
                href="/"
              >
                <Image
                  src={useBreakpointValue({
                    base: useColorModeValue(
                      "/img/logo-s.svg",
                      "/img/logo-s-dark.svg"
                    ),
                    md: useColorModeValue(
                      "/img/logo-xl.svg",
                      "/img/logo-xl-dark.svg"
                    ),
                  })}
                  alt="Logo"
                  width={useBreakpointValue({ base: 50, md: 150 })} // Adjust the width value as per your requirement
                  height={50} // Adjust the height value as per your requirement
                />
              </Link>
            </Center>

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

        <SideBarDrawer
          siteConfig={siteConfig}
          onClose={onClose}
          isOpen={isOpen}
        />
      </Box>
    </Slide>
  );
}
