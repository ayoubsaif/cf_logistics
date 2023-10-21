import React, { useState } from "react";
import { useForm } from "react-hook-form"
import { useRouter } from "next/router";

import {
    Flex,
    InputGroup,
    InputRightElement,
    Input,
    Text,
    Button,
    Stack,
    Select,
    Switch,
    Divider,
    Icon,
    Box,
    useToast,
    FormControl,
    IconButton,
    Heading
} from "@chakra-ui/react";

import {
    RiEyeLine as EyeIcon,
    RiEyeOffLine as EyeCrossedIcon,
    RiAddLine as AddIcon
} from "react-icons/ri";

import { createUser } from "@/services/users";
import { useSession } from "next-auth/react";

export default function UserCreateForm() {
    const { data: session } = useSession();
    const user = session?.user;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const toast = useToast();
    const router = useRouter();
    
    const [show, setShow] = useState(false)

    const onSubmit = async (data) => {
        const create = await createUser(data, user?.accessToken);
        if (create) {
            toast({
                title: "Usuario creado",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setTimeout(() => {
                router.push('/users');
            }, 500);
        } else {
            toast({
                title: "Algo ha ido mal",
                description: `No se ha podido crear al usuario. Por favor, inténtalo de nuevo más tarde.`,
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        }
    }

    const roleOptions = [
        { label: 'Cliente', value: 'client' },
        { label: 'Administrador', value: 'admin' }
    ]

    return (
        <Box bgColor="bg.surface" p={5}
            borderWidth={1} borderRadius="md"
            boxShadow="sm"
            w='full'
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={5}>
                    <Flex w='full' justifyContent='space-between'>
                        <Heading as="h2" fontSize='2xl' fontWeight='bold' mb="2">Crear Usuario</Heading>
                    </Flex>
                    <Flex>
                        <FormControl>
                            <Text fontSize='md'>Activar/Desactivar</Text>
                            <Switch
                                mt={3}
                                colorScheme="brand"
                                {...register('active')}
                            />
                        </FormControl>
                    </Flex>
                    <Flex gap={5} flexDirection={["column", "row"]}>
                        <FormControl>
                            <Text fontSize='md'>Nombre</Text>
                            <InputGroup colorScheme="brand">
                                <Input type='text' placeholder='Nombre del usuario' focusBorderColor='brand.400' {...register('firstName', { required: true })} />
                            </InputGroup>
                            {errors.firstName && <Text color="red.300" fontsize="xs" mt={1}>El nombre del usuario es obligatorio</Text>}
                        </FormControl>
                        <FormControl>
                            <Text fontSize='md'>Apellidos</Text>
                            <InputGroup colorScheme="brand">
                                <Input type='text' placeholder='Apellidos del usuario' focusBorderColor='brand.400' {...register('lastName', { required: true })} />
                            </InputGroup>
                            {errors.lastName && <Text color="red.300" fontsize="xs" mt={1}>El apellido del usuario es obligatorio</Text>}
                        </FormControl>
                    </Flex>
                    <Divider />
                    <Flex gap={5} flexDirection={["column", "row"]}>
                        <FormControl>
                            <Text fontSize='md'>Email</Text>
                            <InputGroup colorScheme="brand">
                                <Input type='text' placeholder='Email del usuario' focusBorderColor='brand.400' {...register('email', { required: true })} />
                            </InputGroup>
                            {errors.email && <Text color="red.300" fontsize="xs" mt={1}>El email del usuario es obligatorio</Text>}
                        </FormControl>
                        <FormControl>
                            <Text fontSize='md'>Contraseña</Text>
                            <InputGroup colorScheme="brand">
                                <Input
                                    type={show ? 'text' : 'password'}
                                    placeholder='Contraseña'
                                    focusBorderColor='brand.400' 
                                    autoComplete="new-password"
                                    {...register('password', { required: true })}
                                />
                                <InputRightElement>
                                    <IconButton size='sm' onClick={() => setShow(!show)} variant='ghost' icon={show ? <Icon as={EyeCrossedIcon} boxSize={5} /> : <Icon as={EyeIcon} boxSize={5} />} />
                                </InputRightElement>
                            </InputGroup>
                            {errors.password && <Text color="red.300" fontsize="xs" mt={1}>La contraseña es obligatoria</Text>}
                        </FormControl>
                    </Flex>
                    <Divider />
                    <Flex gap={5} flexDirection={["column", "row"]}>
                        <FormControl>
                            <Text fontSize='md'>Rol</Text>
                            <InputGroup colorScheme="brand">
                                <Select focusBorderColor='brand.400' {...register('role', { required: true })}>
                                    {roleOptions.map((role, index) => (
                                        <option key={index} value={role?.value}>{role?.label}</option>
                                    ))}
                                </Select>
                                {errors.role && <span>This field is required</span>}
                            </InputGroup>
                        </FormControl>
                    </Flex>
                    <Button mt={10} colorScheme='brand' type='submit' >
                        <Icon as={AddIcon} boxSize={5} mr={3} />
                        Crear
                    </Button>
                </Stack>
            </form>
        </Box >
    )
}