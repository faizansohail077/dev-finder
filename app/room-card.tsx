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
import { Button } from "../components/ui/button";
import { GithubIcon } from "lucide-react";
import { getsessions } from "@/lib/auth";

export default function RoomCard({ room }: { room: IRoom }) {
    const session = getsessions()
    return (
        <Card>
            <CardHeader>
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
            </CardFooter>
        </Card>

    )
}