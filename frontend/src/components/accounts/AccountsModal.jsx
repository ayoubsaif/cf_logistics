import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import { useSession } from "next-auth/react";
import {
    Select,
} from "chakra-react-select";
import {
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Divider,
    Icon,
    Flex,
} from "@chakra-ui/react";

import { useQuery } from 'react-query';
import {
    RiBuildingLine as AccountIcon,
} from "react-icons/ri";

export default function AccountsModal(props) {
    const Router = useRouter();
    const { data: session, update } = useSession();
    const { isLoading, error, data } = useQuery("accounts", () =>
        fetch("/api/accounts").then((res) => res.json())
    );

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
    const [selectedAccountId, setSelectedAccountId] = useState(null);

    const onSubmit = async ({ account }) => {
        await update({ ...session, user: { ...session.user, accountId: account.value, accountName: account.label } });
        props.onClose();
        Router.push('/');
    };

    const handleSelectChange = (selectedValue) => {
        setSelectedAccountId(selectedValue);
        setValue("account", selectedValue); // Update the form value
    };

    return (
        <Modal {...props}>
            <ModalOverlay
                bg="blackAlpha.300"
                backdropFilter="blur(10px)"
            />
            <ModalContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>
                        <Flex gap={2} alignItems="center">
                            <Icon as={AccountIcon} />Cuenta
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontSize="sm" color="GrayText">
                            Cuenta activa: <b>{session.user.accountName}</b>
                        </Text>
                        <Divider my={2} />
                        <FormControl>
                            <FormLabel>Cambiar cuenta</FormLabel>
                            {data && session.user.accountId && (
                                <Select
                                    selectedOptionStyle="check"
                                    focusBorderColor="brand.500"
                                    options={data.map((account) => ({
                                        // map if is different from current account
                                        value: account.accountId,
                                        label: account.name,
                                        isDisabled: account.accountId === session.user.accountId,
                                    }))}
                                    onChange={handleSelectChange} // Handle change event
                                />
                            )}
                            <Text color="red.300" fontSize="xs" mt={1}>
                                {error && error.message}
                            </Text>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter justifyContent="space-between">
                        <Button colorScheme="brand" type="submit" isDisabled={!selectedAccountId}>Cambiar</Button>
                        <Button variant="ghost" onClick={props.onClose}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
}