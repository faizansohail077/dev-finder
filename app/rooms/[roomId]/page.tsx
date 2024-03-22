import { getRoom } from "@/app/data-access/rooms"
import { GithubIcon } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { VideoPlayer } from "./video-player"

const RoomPage = async ({ params }: { params: { roomId: string } }) => {
    let roomId = params.roomId
    const room = await getRoom(roomId)

    if (!room) return <div className="">No Room Of this Id Found</div>
    const languages = room?.language.split(",").map((tag) => tag.trim())
    return (
        <div className="grid grid-cols-4 min-h-screen">
            <div className="col-span-3 p-4 pr-2">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                    <VideoPlayer room={room} />
                </div>
            </div>


            <div className="p-4 pl-2">
                <div className="flex flex-col gap-4 rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                    <h1 > {room?.name} </h1>
                    <p className="text-gray-600" > {room?.description} </p>
                    <h3>Tags:</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                        {languages?.map((language) => {
                            return (
                                <Badge variant="outline" className="w-fit" key={language} >{language}</Badge>
                            )
                        })}
                    </div>
                    {
                        room?.githubRepo && <Link rel="noopener noreferrer" target="_blank" className="flex items-center" href={room?.githubRepo} ><GithubIcon className="mr-2" /> Github Project</Link>
                    }
                </div>


            </div>
        </div>
    )
}

export default RoomPage