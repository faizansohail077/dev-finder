"use server"

import { getsessions } from "@/lib/auth"
import { StreamChat } from 'stream-chat'

export async function generateTokenAction() {
    const session = await getsessions()
    if (!session) throw new Error("User not found")
    const api_key = process.env.NEXT_PUBLIC_STREAM_API_KEY!
    const api_secret = process.env.STREAM_API_SECRET!
    const user_id = session?.user?.id
    const serverClient = StreamChat.getInstance(api_key, api_secret)
    const token = serverClient.createToken(user_id)
    return token
}