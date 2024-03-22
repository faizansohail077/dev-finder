"use client"
import { IRoom } from '@/db/schema';
import {
    Call,
    CallControls,
    CallParticipantsList,
    SpeakerLayout,
    StreamCall,
    StreamTheme,
    StreamVideo,
    StreamVideoClient,
} from '@stream-io/video-react-sdk';
import "@stream-io/video-react-sdk/dist/css/styles.css"
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { generateTokenAction } from './actions';
import { useRouter } from 'next/navigation';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

export const VideoPlayer = ({ room }: { room: IRoom }) => {

    if (!room) return


    const session: any = useSession()
    const [client, setClient] = useState<StreamVideoClient | null>(null)
    const [call, setCall] = useState<Call | null>(null)
    const router = useRouter()
    useEffect(() => {
        if (!session.data) {
            return
        }

        const client = new StreamVideoClient({ apiKey, user: { id: session?.data?.user?.id, name: session?.data?.user?.name }, tokenProvider: () => generateTokenAction() });
        setClient(client)
        const call = client.call('default', room.id);
        call.join({ create: true });
        setCall(call)
        return () => {
            call.leave()
                .then(() => client.disconnectUser())
                .catch((err) => console.log(err, 'err'))

        }
    }, [session, room])
    return client && call && (
        <StreamVideo client={client}>
            <StreamTheme>
                <StreamCall call={call}>
                    <SpeakerLayout />
                    <CallControls onLeave={async () => {
                        router.push('/')
                    }} />
                    <CallParticipantsList onClose={() => undefined} />
                </StreamCall>
            </StreamTheme>
        </StreamVideo>
    );
};