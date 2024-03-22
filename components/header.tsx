"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { ModeToggle } from "./ui/toggle-button";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";
import { DeleteIcon } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react";
import { getsessions } from "@/lib/auth";
import deleteUser from "@/app/data-access/users";
import { deleteAccount } from "@/app/actions";

function AccountDropDown() {
    const session = useSession()
    const [open, setOpen] = useState(false)
   
    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently remove your account and any data associate with it.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={async () => {
                            await deleteAccount();
                            signOut({ callbackUrl: "/" })
                        }} > Yes, Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild >
                    <Button variant={"link"} >
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
                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <DeleteIcon className="mr-2" />
                        Delete Account</DropdownMenuItem>


                </DropdownMenuContent>
            </DropdownMenu>
        </>

    )
}
export function Header() {
    const session = useSession()

    return (
        <header className="z-10 bg-gray-100 dark:bg-gray-900  py-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    {/* logo */}
                    <Link href={"/"} className="">
                        Dev Finder
                    </Link>

                    <Link href={"/browse"} >Browse</Link>

                    <div className="flex items-center gap-4">
                        {session.data ?
                            <AccountDropDown /> :
                            <Button variant={"outline"} onClick={() => signIn("google")} >Sign In</Button>
                        }
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </header>
    )
}