"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { ModeToggle } from "./ui/toggle-button";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";

function AccountDropDown() {
    const session = useSession()
    const isLoggedIn = !!session.data

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild >
                <Button className="mr-2" variant={"outline"} >
                    <Avatar className="mr-2">
                        <AvatarImage src={session?.data?.user?.image ?? ""} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {session?.data?.user?.name}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>

                {isLoggedIn ?
                    <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
                    :
                    <DropdownMenuItem onClick={() => signIn("google")}>Sign In</DropdownMenuItem>
                }
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
                    <AccountDropDown />
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}