import React from 'react'
import EditRoomForm from './edit-room-form'
import { getRoom } from '@/app/data-access/rooms'

const EditRoom = async ({ params }: { params: { roomId: string } }) => {
    const room = await getRoom(params.roomId)
    if(!room){
        return alert("Room Not Found")
    }
    return (
        <div className="container mx-auto flex flex-col gap-2 py-12">

            <h1 className="text-4xl font-bold" >Edit Room Form</h1>
            <EditRoomForm room={room} />
        </div>
    )
}

export default EditRoom