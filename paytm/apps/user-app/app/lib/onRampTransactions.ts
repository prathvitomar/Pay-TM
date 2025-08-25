"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(amount: number, provider: string) {
    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;
        if (!userId) {
            return { message: "User not authenticated" };
        }
        const token = String(Math.random() * 100);
        const newRampTransaction = await prisma.onRampTransaction.create({
            data: {
                status: "Processing",
                amount: amount*100,
                provider: provider,
                token,
                startTime: new Date(),
                userId: 1,
            },
        });

        return { data: newRampTransaction, message: "Transfer Successful" };
    } catch (error) {
        return { message: "Request Failed" };
    }
}