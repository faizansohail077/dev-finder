"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { ModeToggle } from "./ui/toggle-button";
import { Button } from "./ui/button";

export function Header() {
    const session = useSession()

    return (
        <header>
            <div className="">
                {session?.data ? <Button onClick={() => signOut()} >Sign Out</Button>
                    :
                    <Button onClick={() => signIn("google")}>Sign In</Button>
                }
                <ModeToggle />
            </div>
        </header>
    )
}