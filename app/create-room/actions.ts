"use server"

import { db } from "@/db";
import { IRoom, room } from "@/db/schema";
import { getsessions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createRoomAction(roomData: Omit<IRoom, "id" | "userId">) {
    const session = await getsessions()
    if (!session) { throw new Error("Not Authorized") }
    const newroom = await db.insert(room).values({ ...roomData, userId: session.user.id }).returning()
    revalidatePath("/")
    return newroom[0]
}
