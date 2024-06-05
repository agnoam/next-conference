"use client"

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

import FeedViewer from "./componenets/FeedViewer";
import ChatContainer from "./componenets/ChatContainer";
import ControlPanel from "./componenets/ControlPanel";

const SILENCE_FRAME: Buffer = Buffer.from([0xf8, 0xff, 0xfe]);

export interface HIDState {
    video?: boolean;
    audio?: boolean;
    screen?: boolean;
}

interface ChannelsMap {
    [channelName: string]: RTCDataChannel[];
}

// TODO: Generate metadata dynamically (change title acording name of the meeting)

/* 
    Explantion for WebRTC protocol:
    1. Create a `RTCPeerConnection`
    2. Create `RTCDataChannel` for each type of message (audio, video, screenshare, etc.)
    3. Create RTC Offer
    4. Broadcast the offer to all participants
    5. Wait for RTC Answer
*/
export default function MeetingPage() {
    const params = useParams();
    const videoRef = useRef<HTMLVideoElement>(null);

    const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>();
    const [connectionString, setConnectionString] = useState<string>();
    const [currentAnswer, setCurrentAnswer] = useState<string>();
    const [channel, setChannel] = useState<RTCDataChannel>();
    const [selectedDeviceID, setSelectedDeviceID] = useState<string>();
    const [currentMediaStream, setCurrentMediaStream] = useState<MediaStream>(); // TODO: Change to array that contains all of the streams
    const [HIDState, setHIDState] = useState<HIDState>({
        video: true,
        audio: false,
        screen: false
    }); // Should be using context api


    const waitForAllICE = async (peerConnection: RTCPeerConnection) => {
        return new Promise<void>((fufill, reject) => {
            peerConnection.onicecandidate = (iceEvent) => {
                console.log('peerConnection ice event:', iceEvent);
                if (iceEvent.candidate === null) fufill()
            }
        
            setTimeout(() => reject("Waited too long for ice candidates"), 30000)
        });
    }

    const createWebRTCAnswer = async () => {
        if (!peerConnection) {
            console.error('No peer connection');
            return;
        }

        const connectionString = prompt('Connecting to (WebRTC Offer)')!;
        const remoteOffer = new RTCSessionDescription(JSON.parse(connectionString));
        if (!remoteOffer) return;

        await peerConnection!.setRemoteDescription(remoteOffer);
        const localAnswer: RTCSessionDescriptionInit = await peerConnection!.createAnswer();
        peerConnection!.setLocalDescription(localAnswer);
        console.log('receiver local description (WebRTC Answer):', localAnswer);
        await waitForAllICE(peerConnection);

        console.log("localOfferWithICECandidates:")
        console.log(JSON.stringify(peerConnection.localDescription))

        peerConnection.ontrack = (event) => {
            console.log('tracks:', event);
        }

        peerConnection.ondatachannel = (data) => {
            console.log('data channel', data);
        }

        setCurrentAnswer(JSON.stringify(peerConnection.localDescription?.toJSON()));
    }

    const createOffer = async (peerConnection: RTCPeerConnection) => {
        const localOffer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(localOffer);

        setConnectionString(JSON.stringify(peerConnection.localDescription));
    }

    const receiveAnswer = () => {
        const remoteConnectionString: string = prompt('remote connection string')!;
        const remoteDescription = new RTCSessionDescription(JSON.parse(remoteConnectionString));
        peerConnection!.setRemoteDescription(remoteDescription);
    }

    const sendData = () => {
        const dataAsString: string = prompt('Some payload')!;
        console.log(channel?.readyState);
        channel!.send(dataAsString);
    }

    useEffect(() => {
        const _peerConnection = new RTCPeerConnection();
        if (_peerConnection) {
            console.log("RTCPeerConnection object was created", _peerConnection);
            console.log('rtcdescription', _peerConnection.localDescription);
    
            // const channel = peerConnection.createDataChannel('video');
            const channel = _peerConnection.createDataChannel('bla');
            setChannel(channel);
            
            createOffer(_peerConnection);
            _peerConnection.onconnectionstatechange = (event) => {
                console.log('connection state changed:', event);
            }
    
            _peerConnection.oniceconnectionstatechange = function (event) {
                console.log('ice connection state changed:', event);
            }
    
            _peerConnection.onicecandidateerror = (event) => {
                console.error('ice candidate error:', event);
            }
    
            _peerConnection.onicecandidate = function (event) {
                console.log('event:', event);
            }
    
            _peerConnection.ondatachannel = function (event) {
                console.log('data channel recieved:', event);
                setChannel(event.channel);
                event.channel.onmessage = (event) => console.log(`received message from channel ${channel.label}`, event.data)
            }
        }

        setPeerConnection(_peerConnection);
    }, [])

    // useEffect(() => {
    //     showCurrentStream();
    // }, [currentMediaStream]);

    return (
        <>
            <nav>
                {/* To layout */}
                <p>Meeting page</p>
                <p>{connectionString}</p>
                {currentAnswer && <p>Answer: {currentAnswer}</p>}
            </nav>
            <aside>
                <ChatContainer meetingID={params?.id as string} />
            </aside>
            <main>
                <FeedViewer />
                <button onClick={createWebRTCAnswer}>Generate answer</button>
                <button onClick={receiveAnswer}>Add remote connection (Receive Answer)</button>
                <button onClick={sendData}>Send Data</button>
            </main>
            {/* <footer>
                <ControlPanel HIDState={HIDState} setHIDState={setHIDState} />
                { currentMediaStream && <video ref={videoRef} autoPlay /> }
                { !currentMediaStream?.active && <button onClick={() => getConnectedCameras().then((devices) => getCameraFeed((devices[0] as any).id).then(() => showCurrentStream()))}>Start</button> }
                { currentMediaStream?.active && <button onClick={stopFeed}>Stop</button> }
            </footer> */}
        </>
    )
}