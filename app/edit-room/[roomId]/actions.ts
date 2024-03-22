"use server"

import { editRoom, getRoom } from "@/app/data-access/rooms";
import { db } from "@/db";
import { IRoom, room } from "@/db/schema";
import { getsessions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createRoomAction(roomData: Omit<IRoom, "id" | "userId">) {
    const session = await getsessions()
    if (!session) { throw new Error("Not Authorized") }
    await db.insert(room).values({ ...roomData, userId: session.user.id })
    revalidatePath("/")
}
export async function editRoomAction(roomData: Omit<IRoom, "userId">) {
    const session = await getsessions()
    if (!session) { throw new Error("Not Authorized") }
    const room = await getRoom(roomData.id)
    if (room?.userId != session?.user?.id) {
        return alert("UnAuthorized")
    }
    await editRoom({...roomData,userId:room?.userId!})
    revalidatePath("/your-room")
}
