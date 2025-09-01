"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { p2pTransfer } from "../app/lib/p2pTransfer";

interface P2pInterface {
  transferedAmount: string;
  phoneNumber: number;
}

async function sendP2P(data: P2pInterface) {
    try {
      const res = await p2pTransfer(
        data.transferedAmount,
        data.phoneNumber
      );
      console.log("P2P res : ", res);
      if (
        res &&
        (res.message === "Insufficient Balance" ||
          res.message === "Transfer Failed" ||
          res.message === "Request Failed")
      ) {
        return alert("Transfer Failed");
      }
      return res;
    } catch (error) {
      throw error;
    }
}

export const P2pTransactions = () => {
  const [data, setData] = useState<P2pInterface>({
    transferedAmount: "",
    phoneNumber: 0,
  });

  async function handleP2Pmoney() {
    try {
        const res = await sendP2P(data);
        if(res) alert(res.message);
    } catch (error) {
      throw error;
    }
  }

//   async function handleP2Pmoney() {
//     try {
//       const session = await getServerSession(authOptions);
//       const res = await createP2PTransfer(
//         data.transferedAmount,
//         data.phoneNumber
//       );
//       if (
//         res.message === "Insufficient Balance" ||
//         res.message === "Transfer Failed" ||
//         res.message === "Request Failed"
//       ) {
//         alert("Transfer Failed");
//       }
//       alert("Transfer Successful");
//     } catch (error) {
//       throw error;
//     }
//   }

  return (
    <Card title="Peer to Peer Transactions">
      <div className="w-full">
        <TextInput
          label={"Number"}
          placeholder={"Number"}
          onChange={(value: string) =>
            setData((prev) => ({ ...prev, transferedAmount: String(value) }))
          }
        />
        <TextInput
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(value: string) =>
            setData((prev) => ({ ...prev, phoneNumber: Number(value) }))
          }
        />
        {/* <div className="py-4 text-left">
            Bank
        </div> */}
        <div className="flex justify-center pt-4">
          <Button onClick={handleP2Pmoney}>Send Money</Button>
        </div>
      </div>
    </Card>
  );
};
