import { createServer } from "http";
import { Server, Socket } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});
const PORT: number = +(process.env.PORT || 3000);

enum EventNames {
    JOIN = 'join-meeting',
    NEW_USER = 'new-user',
    OFFER = 'offer',
    LEAVE = 'leave-meeting'
}

io.on("connection", (socket: Socket) => {
    console.log("New connection established");

    socket.on(EventNames.JOIN, async (data) => {
        await socket.join(data.meetingID);
        console.log('Broadcasting to everybody in this room the sockedID of the new user', socket.id);
        socket.to(data.meetingID).emit(EventNames.NEW_USER, { id: socket.id, name: data.name });
    });

    socket.on(EventNames.OFFER, (data) => {
        // Sends the offer to the newly joined user
        socket.to(data.targetID).emit(data.offer);
    });

    socket.on(EventNames.LEAVE, (data) => {
        // User leaves the meeting
        data.meetingID && socket.leave(data.meetingID);
    });
})

httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}`));