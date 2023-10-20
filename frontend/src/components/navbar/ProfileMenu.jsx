import {
  Menu,
  MenuButton,
  MenuGroup,
  MenuList,
  MenuItem,
  MenuDivider,
  Flex,
  Avatar,
  Text,
  Box,
  Center,
  useDisclosure,
  Button
} from "@chakra-ui/react";
import NextLink from "next/link";

import {
  RiLogoutCircleLine as LogoutCircleIcon,
  RiAdminLine as AdminIcon,
  RiGroupLine as UsersIcon,
  RiBuilding4Line as AccountsIcon,
  RiBuildingLine as AccountIcon,
} from "react-icons/ri";
import Accounts from "@/components/navbar/Accounts";

export default function ProfileMenu({ session, signOut }) {
  return (
    <Menu>
      <MenuButton rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
        <Flex direction={"row"} align={"center"} p={2}>
          <Avatar size={"sm"} src={session.user.image} />
          <Text ml={2} display={{ base: "none", md: "flex" }}>
            {session.user.firstname}
          </Text>
        </Flex>
      </MenuButton>
      <MenuList
        overflow={"hidden"}
        alignItems={"center"}
      >
        <Flex direction={"row"} align={"center"} p={2}>
          <Center>
            <Avatar size={"lg"} src={session.user.image} />
          </Center>
          <Box px={2} ml={2}>
            <Text>{session.user.name}</Text>
            <Text>{session.user.accountName}</Text>
          </Box>
        </Flex>
        <MenuDivider />
        {session.user.role === "admin" && (
          <>
            <MenuGroup fontSize="md" title="Admin" icon={<AdminIcon />}>
              <MenuItem as={NextLink} href={"/admin/users"} pl={5}
                icon={<UsersIcon size={18} />}>
                Usuarios
              </MenuItem>
              <MenuItem as={NextLink} href={"/admin/accounts"} pl={5}
                icon={<AccountsIcon size={18} />}>
                Cuentas
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
          </>
        )}
        <Accounts fontSize="md" />
        <MenuGroup fontSize="md">
          <MenuItem
            onClick={() => signOut({ callbackUrl: "/" })}
            pl={5}
            icon={<LogoutCircleIcon size={18} />}>
            Cerrar sesión
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}
