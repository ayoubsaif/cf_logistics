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
import { deleteAccount, getAccounts } from "@/services/accounts";	
import NextLink from "next/link";

const AccountsTable = ({ initialAccounts, token }) => {
    const { onOpen, isOpen, onClose } = useDisclosure();
    const [ onDeleteAccounts, setOnDeleteAccount ] = useState();
    const [ accounts, setAccounts ] = useState(initialAccounts || []);
    const cancelRef = useRef();
    const toast = useToast();


    const onDelete = async (id) => {
        const deleteResponse = await deleteAccount(id, token);
        if (deleteResponse) {
          const initialAccounts = await getAccounts(token);
          setAccounts(initialAccounts);
          onClose();
          toast({
            title: "Cuenta Eliminado",
            description: `La cuenta ha sido eliminada correctamente.`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          setOnDeleteAccount(null);
        } else {
            toast({
                title: "Algo ha ido mal",
                description: `No se ha podido eliminar la cuenta. Por favor, inténtalo de nuevo más tarde.`,
                status: "warning",
                duration: 4000,
                isClosable: true,
            });
        }
    };

    return(
        <>
            <TableContainer border="1px solid" borderRadius="lg" borderColor="gray.300">
                <Table variant='striped' colorScheme='gray'>
                    <Thead>
                        <Tr>
                            <Th>ID Cuenta</Th>
                            <Th>Nombre</Th>
                            <Th>Nombre Legal</Th>
                            <Th>VAT</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {accounts?.map((account) => (
                            <Tr key={account.id}>
                                <Td>{account.accountId.toUpperCase()}</Td>
                                <Td>{account?.companyName}</Td>
                                <Td>{account?.companyLegalName}</Td>
                                <Td>{account?.companyVat}</Td>
                                <Td>
                                    <Menu>
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
                                                href={`/accounts/${account?.id}/edit`}
                                            >
                                                Editar
                                            </MenuItem>
                                            <MenuItem 
                                                icon={<Icon as={DeleteIcon} boxSize={5} />}
                                                onClick={() => {
                                                    setOnDeleteAccount(account);
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
                    Eliminar cuenta {onDeleteAccounts?.companyName}
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    ¿ Estás seguro ? No podrás deshacer esta acción.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancelar
                    </Button>
                    <Button colorScheme='red' onClick={() => onDelete(onDeleteAccounts?.id)} ml={3}>
                      Eliminar
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default AccountsTable;