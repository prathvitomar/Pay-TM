import prisma from "@repo/db/client";
import { NextResponse } from "next/server";

async function POST(request: Request) {
    try {
        const resData = await request.json();
        console.log("Request received at transfer api", resData);

        if (!resData || !resData.amount || !resData.provider) {
            return NextResponse.json({ message: "Invalid Request" }, { status: 400 });
        }

        const newRampTransaction = await prisma.onRampTransaction.create({
            data: {
                status: "Success",
                amount: Number(resData.amount),
                provider: resData.provider,
                token: "vdvdhavwihvd23432n",
                startTime: new Date(),
                userId: 1,
            },
        });

        return NextResponse.json(
            { data: newRampTransaction, message: "Transfer Successful" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error in transfer API:", error);
        return NextResponse.json({ message: "Request Failed" }, { status: 500 });
    }
}

export { POST  };