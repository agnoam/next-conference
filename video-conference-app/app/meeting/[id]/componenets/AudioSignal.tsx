'use client'

export interface AudioSignalBoxProperty {
    recordStream: MediaStream;
}

const AudioSignalBox = (props: AudioSignalBoxProperty): JSX.Element => {
    return (
        <div>
            Audio
        </div>
    )
}

export default AudioSignalBox;