"use client";
import React, { useState } from "react";
import { createP2PTransfer } from "../../lib/p2pTransfer";

async function page() {
  const [data, setData] = useState({
    transferedAmount: 0,
    phoneNumber: 0,
  });

  async function handleSendMoney() {
    try {
      const res = await createP2PTransfer(
        data.transferedAmount,
        data.phoneNumber
      );
      if (
        res.message === "Insufficient Balance" ||
        res.message === "Transfer Failed" ||
        res.message === "Request Failed"
      )
        alert("Transfer Failed");
        alert("Transfer Successful");
    } catch (error) {
      throw error;
    }
  }

  return (
    <div>
      <div>
        <h1>Send Peer to Peer Transfer</h1>
      </div>
      <div>
        <input
          type="number"
          value={data.phoneNumber}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              phoneNumber: Number(e.target.value),
            }))
          }
        />
      </div>
      <div>
        <input
          type="number"
          value={data.transferedAmount}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              transferedAmount: Number(e.target.value),
            }))
          }
        />
      </div>
      <div>
        <button onClick={handleSendMoney}>Send Money</button>
      </div>
    </div>
  );
}

export default page;
