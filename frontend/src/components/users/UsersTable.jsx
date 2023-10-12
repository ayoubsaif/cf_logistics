import React from "react";
import {
   TableContainer, Table, Thead, Tr, Th, Td, Tbody, Avatar
} from "@chakra-ui/react";

const UsersTable = ({ users }) => {
    console.log(users);
    return(
        <TableContainer border='1px solid' borderRadius='lg' borderColor='gray.300'>
            <Table variant='striped' colorScheme='gray'>
                <Thead>
                    <Tr>
                        <Th>#ID</Th>
                        <Th>Avatar</Th>
                        <Th>Nombre</Th>
                        <Th>Apellido</Th>
                        <Th>Email</Th>
                        <Th>Role</Th>
                        <Th>Acciones</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map((user) => (
                        <Tr>
                            <Td>#{user.id}</Td>
                            <Td><Avatar name={user?.name} src={user?.image} /></Td>
                            <Td>{user?.firstName}</Td>
                            <Td>{user?.lastName}</Td>
                            <Td>{user?.email}</Td>
                            <Td>{user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}</Td>
                            <Td>Acciones</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default UsersTable;