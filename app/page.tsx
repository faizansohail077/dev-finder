import { db } from "@/db";

export default async function Home() {
  const items = await db.query.testing.findMany()
  console.log(items, 'items')
  return (
    <div className="">
      {items?.map((item) => {
        return (
          <div key={item.id} className="">{item.name}</div>
        )
      })}
    </div>
  );
}
