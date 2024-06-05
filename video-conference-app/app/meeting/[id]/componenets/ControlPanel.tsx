import { Dispatch, SetStateAction } from "react";
import { HIDState } from "../page";

export interface ControlPanelProps {
    HIDState: HIDState;
    setHIDState: Dispatch<SetStateAction<HIDState>>;
}

const ControlPanel = (props: ControlPanelProps) => {
    const toggleAudioState = () => {
        props.setHIDState((prev: HIDState) => {
            return {
                ...prev,
                audio: !prev.audio
            }
        })
    }
    
    const toggleVideoState = () => {
        props.setHIDState((prev: HIDState) => {
            return {
                ...prev,
                screen: false,
                video: !prev.video
            }
        })
    }

    const toggleScreenState = () => {
        props.setHIDState((prev: HIDState) => {
            return {
                ...prev,
                video: false,
                screen: !prev.screen
            }
        })
    }
    
    return (
        <section>
            <button 
                style={{ ...(props.HIDState.screen && { color: 'green' }) }}
                onClick={toggleScreenState}>record/stop screen</button>
            <button 
                style={{ ...(props.HIDState.video && { color: 'green' }) }}
                onClick={toggleVideoState}>camera/hide</button>
            <button 
                style={{ ...(props.HIDState.audio && { color: 'green' }) }}
                onClick={toggleAudioState}>mute/unmute</button>
        </section>
    );
}

export default ControlPanel;