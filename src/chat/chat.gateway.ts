import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private chatService: ChatService) { }

    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('AppGateway');

    // private chat = new ChatEntity();

    @SubscribeMessage('sendMessage')
    handleMessage(client: Socket, mes: { sender: string, room: string, message: string }): void {
        console.log(mes)
        this.server.emit('newMessage', mes);
        this.chatService.create(mes)
    }

    @SubscribeMessage('joinRoom')
    handleJoinRoom(client: Socket, room: string): void {
        client.join(room)
        console.log(room)
        this.server.emit('joinedRoom', room);
    }


    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(client: Socket, room: string): void {
        client.leave(room)
        console.log(room)
        this.server.emit('leftRoom', room);
    }

    afterInit(server: Server) {
        this.logger.log('Init');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
        client.emit('connection', 'Connected!!')
    }

}