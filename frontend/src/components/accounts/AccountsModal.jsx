import React, { useState } from "react";
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
} from "@chakra-ui/react";

import { useQuery } from 'react-query';

import { useForm } from 'react-hook-form';
import { useSession } from "next-auth/react";

export default function AccountsModal(props) {
    const { data: session } = useSession();
    const { isLoading, error, data } = useQuery("accounts", () =>
      fetch("/api/accounts").then((res) => res.json())
    );
  
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
    const [selectedAccountId, setSelectedAccountId] = useState(session?.user?.accountId);
  
    const onSubmit = async (data) => {
      const selectedAccount = data.account;
      console.log(selectedAccount);
    };
  
    const handleSelectChange = (selectedValue) => {
      setSelectedAccountId(selectedValue);
      setValue("account", selectedValue); // Update the form value
    };
  
    return (
      <Modal {...props}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Cuenta</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                {data && session?.user?.accountId && (
                  <Select
                    selectedOptionStyle="check"
                    focusBorderColor="brand.500"
                    options={data.map((account) => ({
                      value: account.accountId,
                      label: `${account.name} (${account.companyName})`,
                    }))}
                    defaultInputValue={session?.user?.accountName}
                    onChange={handleSelectChange} // Handle change event
                  />
                )}
                <Text color="red.300" fontSize="xs" mt={1}>
                  {error && error.message}
                </Text>
              </FormControl>
            </ModalBody>
            <ModalFooter justifyContent="space-between">
              <Button colorScheme="brand" type="submit">Cambiar</Button>
              <Button variant="ghost" onClick={props.onClose}>
                Cancelar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    );
  }