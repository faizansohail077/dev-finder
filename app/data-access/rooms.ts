import { db } from "@/db"
import { IRoom, room } from "@/db/schema"
import { getsessions } from "@/lib/auth"
import { eq, like } from "drizzle-orm"

export async function getRooms(search: string | undefined) {
    const where = search ? like(room.language, `%${search}%`) : undefined
    const rooms = await db.query.room.findMany({
        where
    })
    return rooms
}
export async function getUserRooms() {
    const session = await getsessions()
    if (!session) { return alert("UnAuthorized") }
    const rooms = await db.query.room.findMany({
        where: eq(room.userId, session?.user?.id)
    })
    return rooms
}

export async function getRoom(roomId: string) {
    return await db.query.room.findFirst({
        where: eq(room.id, roomId)
    })
}
export async function deleteRoom(roomId: string) {
    return await db.delete(room).where(eq(room.id, roomId))
}
export async function editRoom(roomData: IRoom) {
    await db.update(room).set({ ...roomData }).where(eq(room.id, roomData.id))
}