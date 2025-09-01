"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
  try {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;

    if (!from) {
      return { success: false, message: "User not authenticated" };
    }

    const toUser = await prisma.user.findFirst({ where: { number: to } });
    if (!toUser) {
      return { success: false, message: "Recipient not found" };
    }

    await prisma.$transaction(async (tx) => {
      const fromBalance = await tx.balance.findUnique({
        where: { userId: Number(from) },
      });

      if (!fromBalance || fromBalance.amount < amount) {
        throw new Error("Insufficient funds");
      }

      await tx.balance.update({
        where: { userId: Number(from) },
        data: { amount: { decrement: amount } },
      });

      await tx.balance.update({
        where: { userId: toUser.id },
        data: { amount: { increment: amount } },
      });
    });

    return { success: true, message: "Transfer successful" };
  } catch (err) {
    console.error("P2P transfer failed:", err);
    return { success: false, message: "Transfer failed" };
  }
}
