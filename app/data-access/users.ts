import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function deleteUser(userId: string) {
    await db.delete(users).where(eq(users.id, userId))
}