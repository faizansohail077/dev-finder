"use server"

import { getsessions } from "@/lib/auth"
import deleteUser from "./data-access/users"

export const deleteAccount = async () => {
    "use server"
    const session = await getsessions()
    if (!session) {
        return alert("UnAuthorized")
    }
    await deleteUser(session?.user?.id)
}