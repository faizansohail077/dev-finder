"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { ModeToggle } from "./ui/toggle-button";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";

function AccountDropDown() {
    const session = useSession()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild >
                <Button variant={"outline"} >
                    <Avatar className="mr-2">
                        <AvatarImage src={session?.data?.user?.image ?? ""} />
                    </Avatar>
                    {session?.data?.user?.name}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>

                <DropdownMenuItem onClick={() => signOut({
                    callbackUrl: "/"
                })}>Sign Out</DropdownMenuItem>
                <DropdownMenuItem asChild >
                    <Link href={"/your-room"} >
                        My Rooms
                    </Link>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export function Header() {
    const session = useSession()

    return (
        <header className="bg-gray-100 dark:bg-gray-900 container mx-auto py-4">
            <div className="flex items-center justify-between">
                {/* logo */}
                <Link href={"/"} className="">
                    Dev Finder
                </Link>
                <div className="flex items-center gap-4">
                    {session.data ?
                        <AccountDropDown /> :
                        <Button variant={"outline"} onClick={() => signIn("google")} >Sign In</Button>
                    }
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}