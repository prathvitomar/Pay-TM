"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnRampTransaction } from "../app/lib/onRampTransactions";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

interface AddMoneyProps {
    amount: number;
    provider: string;
}

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [data, setData] = useState<AddMoneyProps>({
        amount : 0,
        provider: SUPPORTED_BANKS[0]?.name || ""
    });

    async function handleAddMoney(){
        try {
            const res = await createOnRampTransaction(data.amount, data.provider);
            if(res) window.location.href = redirectUrl || "";
        } catch (error) {
            throw error;
        }
    }

    return <Card title="Add Money">
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value: string) => setData((prev)=> ({...prev, amount : Number(value)}))} />
        <div className="py-4 text-left">
            Bank
        </div>
        <Select
            onSelect={(value) => {
                setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "");
                setData(prev => ({ ...prev, provider: value }));
            }}
            options={SUPPORTED_BANKS.map(x => ({
                key: x.name,
                value: x.name
            }))}
        />
        <div className="flex justify-center pt-4">
            <Button onClick={handleAddMoney}>
            Add Money
            </Button>
        </div>
    </div>
</Card>
}
