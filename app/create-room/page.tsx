import Createroomform from "./create-room-form"

const page = () => {
    return (
        <div className="container mx-auto flex flex-col gap-2 py-12">

            <h1 className="text-4xl font-bold" >Create Room</h1>
            <Createroomform />
        </div>
    )
}

export default page