"use server"

import { getsessions } from "@/lib/auth"
import { deleteRoom, getRoom } from "../data-access/rooms"
import { revalidatePath } from "next/cache"

export async function deleteRoomActions(roomId: string) {
    const session = await getsessions()
    if (!session) return alert("UnAuthorized")
    const room = await getRoom(roomId)
    if (room?.userId != session?.user?.id) {
        return alert("UnAuthorized")
    }
    await deleteRoom(roomId)
    revalidatePath("/your-room")
}