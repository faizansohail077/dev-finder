import { Button } from "@/components/ui/button";
import { db } from "@/db";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IRoom } from "@/db/schema";
import { GithubIcon } from "lucide-react";
import { getRooms } from "./data-access/rooms";
import SearchBar from "./SearchBar";
import Tagfilter from "./tag-filter";

function RoomCard({ room }: { room: IRoom }) {
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

export default async function Home({ searchParams }: { searchParams: { search: string } }) {
  const rooms = await getRooms(searchParams.search)

  return (
    <div className=" min-h-screen  p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl" >Find Dev Rooms</h1>
        <Button asChild >
          <Link href={"/create-room"} >
            Create Room
          </Link>

        </Button>
      </div>
      <div className="mb-12">
        <SearchBar />
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
