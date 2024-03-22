"use server"

import { getsessions } from "@/lib/auth"
import deleteUser from "./data-access/users"

export const deleteAccount = async () => {
    const session = await getsessions()
    if (!session) {
        return alert("UnAuthorized")
    }
    await deleteUser(session?.user?.id)
}