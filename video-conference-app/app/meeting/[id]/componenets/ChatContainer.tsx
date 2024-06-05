export interface ChatProps {
    meetingID: string;
}

const ChatContainer = (props: ChatProps) => {
    return (
        <section>
            Chat of {props.meetingID}
        </section>
    );
}
export default ChatContainer;