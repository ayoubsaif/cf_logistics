import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import { useSession } from "next-auth/react";
import {
    MenuGroup,
    MenuItem,
} from "@chakra-ui/react";
import { useQuery } from 'react-query';
import { get } from "@/utils/RequestFactory";

export default function AccountsModal(props) {
    const Router = useRouter();
    const { data: session, update } = useSession();
    const { isLoading, error, data } = useQuery("accounts", () =>
        get("/api/accounts", {}).then((res) => res.json())
    );
    const [selectedAccountId, setSelectedAccountId] = useState(null);

    const handleSelectChange = async (account) => {
        await update({ ...session, user: { ...session.user, accountId: account.value, accountName: account.label } });
        setSelectedAccountId(selectedValue);
        setValue("account", selectedValue); // Update the form value
        Router.push('/');
    };
    console.log(data);
    return (
        <>
            {data && (
                <>
                    <MenuGroup {...props} title="Cuentas">
                        {data.map((account) => {
                            { console.log(account)}
                            <MenuItem key={account.id}
                                onClick={() => handleSelectChange(account)}
                                pl={5}>
                                {account.name}
                            </MenuItem>
                        })}
                    </MenuGroup>
                    <MenuDivider />
                </>
            )}
        </>
    );
}