"use server"

import { db } from "@/db";
import { IRoom, room } from "@/db/schema";
import { getsessions } from "@/lib/auth";

export async function createRoomAction(roomData: Omit<IRoom, "id" | "userId">) {
    const session = await getsessions()
    console.log(session)
    if (!session) { throw new Error("Not Authorized") }
    await db.insert(room).values({ ...roomData, userId: session.user.id })
}