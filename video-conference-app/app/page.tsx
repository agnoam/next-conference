"use client"

import { useRef } from "react";
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const eventIDRef = useRef<HTMLInputElement>(null);

    const navigateMeeting = () => {
        const meetingID: string = eventIDRef.current!.value;
        meetingID && router.push(`/meeting/${meetingID}`);
    }

    return (
        <div>
            Video conference app
            <center>
                <input ref={eventIDRef} placeholder="Event ID"></input>
                <button onClick={navigateMeeting}>Start Meeting</button>
            </center>
        </div>
    )
}