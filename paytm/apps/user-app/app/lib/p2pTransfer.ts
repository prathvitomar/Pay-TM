import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function createP2PTransfer(transferedAmount: number, phoneNumber: number) {
    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;
        if (!userId) {
            return { message: "User not authenticated" };
        }
        const user = await prisma.user.findUnique({
            where: {
                number: String(phoneNumber),
            },
        });
        if (!user) return { message: "User not found" };

        const balance = await prisma.balance.findUnique({
            where: {
                userId: user.id
            }
        });
        if (!balance) return { message: "Balance not found" };
        if(balance.amount < transferedAmount){
            return { message: "Insufficient Balance" };

        }
        const newTransfer = await prisma.balance.update({
            where: {
                id: balance.id
            },
            data: {
                amount: {
                    increment: transferedAmount
                },
            }
        })
        if (newTransfer) {
            return { data: newTransfer, message: "Transfer Successful" };
        }
        return { message: "Transfer Failed" };
    } catch (error) {
        return { message: "Request Failed" };
    }
}