import { getRoom } from "@/app/data-access/rooms"
import { GithubIcon } from "lucide-react"
import Link from "next/link"
import { VideoPlayer } from "./video-player"
import Tagfilter from "@/app/tag-filter"
import { unstable_noStore } from "next/cache"

const RoomPage = async ({ params }: { params: { roomId: string } }) => {
    let roomId = params.roomId
    unstable_noStore()
    const room = await getRoom(roomId)

    if (!room) return <div className="">No Room Of this Id Found</div>
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
                    <Tagfilter room={room} />
                    {
                        room?.githubRepo && <Link rel="noopener noreferrer" target="_blank" className="flex items-center" href={room?.githubRepo} ><GithubIcon className="mr-2" /> Github Project</Link>
                    }
                </div>


            </div>
        </div>
    )
}

export default RoomPage