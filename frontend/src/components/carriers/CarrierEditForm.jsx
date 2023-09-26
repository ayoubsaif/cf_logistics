import React, {useState} from "react";
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
    IconButton
} from "@chakra-ui/react";

import {
    RiEyeLine as EyeIcon,
    RiEyeOffLine as EyeCrossedIcon,
    RiSaveLine as SaveIcon
} from "react-icons/ri";

import { updateCarrier } from "@/services/carriers";

export default function CarrierEditForm({ data, token }) {
    
    const {register, handleSubmit, formState: { errors }} = useForm();
    const toast = useToast();
    const router = useRouter();

    const [show, setShow] = useState(false)
    
    const onSubmit = async (data) => {
        const update = await updateCarrier('64b267fcd4f08', token, data?.id, data);
        if (update?.status === 200) {
            toast({
              title: "Transportista actualizado",
              description: `Transportista "${data?.name}" actualizado correctamente.`,
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            setTimeout(() => {
                router.push('/carriers');
            }, 1000);
        } else {
            toast({
                title: "Algo ha ido mal",
                description: `No se ha podido actualizar el transportista. Inténtalo más tarde.`,
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        }
    }

    const carrierOptions = [
        {label: 'Correos', value: 'correos'},
        {label: 'DHL', value: 'dhl'},
        {label: 'GLS', value: 'gls'},
        {label: 'Correos Express', value: 'correosExpress'}
    ]

    return (
        <Box bgColor="bg.surface" p={5}
            borderWidth={1} borderRadius="md"
            boxShadow="sm"
            w='100%'
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex gap={10} flexDirection={["column","row"]} >
                    <Input type='hidden' defaultValue={data?.id} {...register('id')}/>
                    <FormControl>
                        <Text fontSize='md'>Nombre</Text>
                        <InputGroup colorScheme="brand">
                            <Input type='text' placeholder='Nombre del Transportista' focusBorderColor='brand.400' defaultValue={data?.name} {...register('name')}/>
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <Text fontSize='md'>Tipo</Text>
                        <InputGroup colorScheme="brand">
                            <Select placeholder='Tipo de Transportista' focusBorderColor='brand.400' defaultValue={data?.deliveryType} {...register('deliveryType')}>
                                {carrierOptions.map((carrier, index) => (
                                    <option key={index} value={carrier?.value}>{carrier?.label}</option>
                                ))}
                            </Select>
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <Text fontSize='md'>Activar/Desactivar</Text>
                        <Switch
                            mt={3}
                            colorScheme="brand"
                            defaultChecked={data?.isActive}
                            isReadOnly={data?.isActive}
                            {...register('isActive')}
                        />
                    </FormControl>
                </Flex>
                <Divider my={8} />
                <Flex w='100%' gap={10}>
                    <FormControl w='50%'>
                        <Text fontSize='md'>Usuario</Text>
                        <InputGroup colorScheme="brand">
                            <Input type='text' placeholder='Nombre de usuario' focusBorderColor='brand.400' defaultValue={data?.username} {...register('username')}/>
                        </InputGroup>
                    </FormControl>
                    <FormControl w='50%'>
                        <Text fontSize='md'>Contraseña</Text>
                        <InputGroup colorScheme="brand">
                            <Input
                                type={show ? 'text' : 'password'}
                                placeholder='Contraseña'
                                focusBorderColor='brand.400' 
                                defaultValue={data?.password} {...register('password')}
                            />
                            <InputRightElement>
                                <IconButton size='sm' onClick={() => setShow(!show)} variant='ghost' icon={show ? <Icon as={EyeCrossedIcon} boxSize={5} /> : <Icon as={EyeIcon} boxSize={5} />} />
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                </Flex>
                <Button mt={10} colorScheme='brand' type='submit' >
                    <Icon as={SaveIcon} boxSize={5} mr={3}/>
                    Guardar
                </Button>
            </form>
        </Box>
    )
}