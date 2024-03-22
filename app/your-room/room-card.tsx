"use client"
import Tagfilter from "@/app/tag-filter";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { IRoom } from "@/db/schema";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { GithubIcon, Pencil, Trash } from "lucide-react";


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
import { deleteRoomActions } from "./actions";


export default function UserRoomCard({ room }: { room: IRoom }) {
    return (
        <Card>
            <CardHeader className="relative">
                <Button className="absolute top-2 right-2" size={"icon"}>
                    <Link href={`/edit-room/${room.id}`} >
                        <Pencil />
                    </Link>
                </Button>
                <CardTitle>{room.name}</CardTitle>
                <CardDescription>{room.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2" >
                <Tagfilter room={room} />

                {
                    room?.githubRepo && <Link rel="noopener noreferrer" target="_blank" className="flex items-center" href={room?.githubRepo} ><GithubIcon className="mr-2" /> Github Project</Link>
                }

            </CardContent>
            <CardFooter>
                <Button asChild >
                    <Link href={`/rooms/${room.id}`} >Join Room</Link>
                </Button>

                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button className="ml-2" variant={"destructive"} >
                            <Trash className="mr-2" />
                            Delete Room
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently remove the room and any data associate with it.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteRoomActions(room.id)}>Yes, Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </CardFooter>

        </Card>

    )
}