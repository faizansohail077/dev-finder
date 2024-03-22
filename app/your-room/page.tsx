import { Button } from "@/components/ui/button";
import Link from "next/link";
import RoomCard from "./room-card";
import { getUserRooms } from "../data-access/rooms";
import { unstable_noStore } from "next/cache";


export default async function YourRoom() {
    unstable_noStore()
    const rooms = await getUserRooms()

    return (
        <div className=" min-h-screen  p-16">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl" >Your Dev Rooms</h1>
                <Button asChild >
                    <Link href={"/create-room"} >
                        Create Room
                    </Link>

                </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {rooms?.map((room) => {
                    return (
                        <RoomCard key={room.id} room={room} />
                    )
                })}
            </div>
        </div>
    );
}
