import { db } from "@/db";

export default async function Home() {
  const rooms = await db.query.room.findMany()

  return (
    <div className="">
      {rooms?.map((room) => {
        return (
          <div key={room.id} className="">{room.name}</div>
        )
      })}
    </div>
  );
}
