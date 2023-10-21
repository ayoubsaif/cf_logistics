import React, { useState, useRef } from "react";
import {
    TableContainer, 
    Table, Thead, Tr, Th, Td, Tbody, 
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    Icon,
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

import {
    RiDeleteBin7Line as DeleteIcon,
    RiEditBoxLine as EditIcon,
    RiMore2Fill as MenuIcon,
} from "react-icons/ri";
import { deleteUser, getUsers } from "@/services/users";	
import NextLink from "next/link";

const UsersTable = ({ initialUsers, token }) => {
    const { onOpen, isOpen, onClose } = useDisclosure();
    const [ onDeleteUser, setOnDeleteUser ] = useState();
    const [ users, setUsers ] = useState(initialUsers || []);
    const cancelRef = useRef();
    const toast = useToast();

    const onDelete = async (id) => {
        const deleteResponse = await deleteUser(id, token);
        if (deleteResponse) {
          const initialUsers = await getUsers(token);
          setUsers(initialUsers);
          onClose();
          toast({
            title: "Usuario Eliminado",
            description: `El usuario ha sido eliminado correctamente.`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          setOnDeleteUser(null);
        } else {
            toast({
                title: "Algo ha ido mal",
                description: `No se ha podido eliminar el usuario. Por favor, inténtalo de nuevo más tarde.`,
                status: "warning",
                duration: 4000,
                isClosable: true,
            });
        }
    };

    return(
        <>
            <TableContainer border='1px solid' borderRadius='lg' borderColor='gray.300'>
                <Table variant='striped' colorScheme='gray'>
                    <Thead>
                        <Tr>
                            <Th>#ID</Th>
                            <Th>Avatar</Th>
                            <Th>Nombre</Th>
                            <Th>Apellidos</Th>
                            <Th>Email</Th>
                            <Th>Role</Th>
                            <Th>Acciones</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {users?.items?.map((user) => (
                            <Tr key={user.id}>
                                <Td>#{user.id}</Td>
                                <Td><Avatar name={user?.name} src={user?.image} /></Td>
                                <Td>{user?.firstName}</Td>
                                <Td>{user?.lastName}</Td>
                                <Td>{user?.email}</Td>
                                <Td>{user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}</Td>
                                <Td>
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
                                                href={`/users/${user?.id}/edit`}
                                            >
                                                Editar
                                            </MenuItem>
                                            <MenuItem 
                                                icon={<Icon as={DeleteIcon} boxSize={5} />}
                                                onClick={() => {
                                                    setOnDeleteUser(user);
                                                    onOpen();
                                                }}
                                            >
                                                Eliminar
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Eliminar usuario {onDeleteUser?.name}
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    ¿ Estás seguro ? No podrás deshacer esta acción.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancelar
                    </Button>
                    <Button colorScheme='red' onClick={() => onDelete(onDeleteUser?.id)} ml={3}>
                      Eliminar
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default UsersTable;