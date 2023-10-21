import React, { useState } from "react";
import { useForm } from "react-hook-form"

import {
    Flex,
    InputGroup,
    Button,
    Stack,
    Select,
    Icon,
    Box,
    useToast,
    FormControl,
    Text,
    IconButton,
    Tooltip,
    Input,
    ButtonGroup
} from "@chakra-ui/react";

import {
    RiEditFill as EditIcon,
    RiAddLine as AddIcon,
    RiSaveLine as SaveIcon,
    RiSubtractLine as RemoveIcon,
    RiArrowGoBackLine as CancelIcon
} from "react-icons/ri";

import { updateRelatedAccounts } from "@/services/accounts";
import { useSession } from "next-auth/react";

export default function UserAccountsEditForm({ userId, accounts, userAccounts }) {
    const [ usedAccounts, setUsedAccounts ] = useState(userAccounts); 
    const [ editMode, setEditMode ] = useState(false);
    const { register, handleSubmit } = useForm();
    const { data: session } = useSession();
    const toast = useToast();
    const user = session?.user;

    const updateAccounts = async () => {
        const dataAccounts = usedAccounts.map((account) => { 
            return parseInt(account?.id)
        });
        const sendAccounts = {
            userId: userId,
            accountsIds: dataAccounts
        }
        const update = await updateRelatedAccounts(sendAccounts, user?.accessToken);

        if (update) {
            toast({
                title: "Cuentas actualizadas",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Algo ha ido mal",
                description: `No se han podido actualizar las cuentas. Por favor, inténtelo de nuevo más tarde.`,
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        }
        setEditMode(false);
    }

    const addAccount = () => {
        setUsedAccounts([...usedAccounts, {}]);
    }

    const removeAccount = (accountId) => {
        setUsedAccounts(usedAccounts.filter((account) => account.id !== accountId));
    }

    const setAccounts = (e, index) => {
        let id = parseInt(e.target.value);
        setUsedAccounts(usedAccounts.map((account, i) => {
            if (i === index) {
                return accounts.find((account) => account.id === id);
            } else {
                return account;
            }
        }));
    }

    return(
        <Box bgColor="bg.surface" p={5}
            borderWidth={1} borderRadius="md"
            boxShadow="sm"
            w='full'
        >
            <form onSubmit={handleSubmit(updateAccounts)}>
                <Stack spacing={5}>
                    <Flex w='full' justifyContent='space-between' gap={5} alignItems='center' alignContent='center'>
                        <Text fontSize='lg'>Cuentas Enlazadas</Text>
                        {editMode ? (
                            <Tooltip label="Añadir cuenta" borderRadius="md">
                                <IconButton
                                    aria-label='add-account' variant="outline" icon={<AddIcon />} 
                                    onClick={() => addAccount()}
                                />
                            </Tooltip>
                        ) : (
                            <Tooltip label="Editar cuentas" borderRadius="md">
                                <IconButton
                                    aria-label='edit-mode' variant="outline" icon={<EditIcon />} 
                                    onClick={() => setEditMode(true)}
                                />
                            </Tooltip>
                        )}
                    </Flex>
                    <Flex gap={3} flexDirection={"column"}>
                        {usedAccounts.map((usedAccount, index) => {
                            return(
                                <FormControl key={index} as={Flex} gap={3}>
                                    {editMode &&
                                        <Tooltip label="Eliminar cuenta" borderRadius="md">
                                            <IconButton 
                                                aria-label='remove-account' variant="outline" icon={<RemoveIcon />} 
                                                onClick={() => removeAccount(usedAccount?.id)} isDisabled={usedAccounts.length === 1}
                                            />
                                        </Tooltip>
                                    }
                                    <InputGroup colorScheme="brand">
                                        {!editMode ?
                                            <InputGroup colorScheme="brand">
                                                <Input type='text' isReadOnly focusBorderColor='brand.400' defaultValue={usedAccount?.companyLegalName} />
                                            </InputGroup>
                                            :
                                            <Select focusBorderColor='brand.400' defaultValue={usedAccount?.id} lineHeight={5}
                                                {...register(`accounts.${index}.id`, { required: true })} onChange={(e) => setAccounts(e, index)}
                                            >
                                                <option value={null}>Selecciona una cuenta</option>
                                                {accounts.map((account, index) => (
                                                    <option key={index} value={account?.id}>{account?.companyLegalName}</option>
                                                ))}
                                            </Select>
                                        }
                                    </InputGroup>
                                </FormControl>
                            )
                        })}
                    </Flex>
                    {editMode && 
                        <ButtonGroup gap='4'>
                            <Button mt={5} colorScheme='brand' type='submit' w='full'>
                                <Icon as={SaveIcon} boxSize={5} mr={3} />
                                Guardar
                            </Button>
                            <Button mt={5} colorScheme='gray'w='full' onClick={() => setEditMode(false)}>
                                <Icon as={CancelIcon} boxSize={5} mr={3} />
                                Cancelar
                            </Button>
                        </ButtonGroup>
                    }
                </Stack>
            </form>
        </Box>
    )
}