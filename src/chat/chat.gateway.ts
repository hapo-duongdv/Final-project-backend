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
import { NotificationService } from 'src/notification/notification.service';
import { NotificationEntity } from 'src/notification/notification.entity';

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private chatService: ChatService,
        private notificationService: NotificationService) { }


    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('AppGateway');

    @SubscribeMessage('sendMessage')
    handleMessage(client: Socket, mes: { sender: string, room: string, message: string, receiver: string }): void {
        console.log(mes)
        this.server.emit('newMessage', mes);
        this.chatService.create(mes)
    }

    @SubscribeMessage('follow')
    handleNotification(client: Socket, notification: { sender: string, receiver: string }): void {
        this.server.emit('newNotification', notification);
        var notifications = new NotificationEntity();
        notifications.sender = notification.sender;
        notifications.receiver = notification.receiver;
        notifications.author = notification.receiver;
        notifications.notification = "Bạn đã được theo dõi bởi " + notification.sender
        this.notificationService.create(notifications)
    }

    @SubscribeMessage('follow-post')
    handleNotification2(client: Socket, notification: { sender: string, receiver: string }): void {
        this.server.emit('newNotification2', notification);
        var notifications = new NotificationEntity();
        notifications.sender = notification.sender;
        notifications.receiver = notification.receiver;
        notifications.author = notification.receiver;
        notifications.notification = notification.sender + " đã theo dõi bài viết của bạn "
        this.notificationService.create(notifications)
    }

    @SubscribeMessage('notification-isBought')
    handleNotificationisBought(client: Socket, notification: { sender: string, receiver: string, posts: string }): void {
        this.server.emit('newNotification-isBought', notification);

        console.log(notification)
        var notifications = new NotificationEntity();
        notifications.sender = notification.sender;
        notifications.receiver = notification.receiver;
        notifications.author = notification.receiver;
        notifications.notification = "Bài đăng sản phẩm " + notification.posts + " của " + notification.sender + " đã được bán"
 
        this.notificationService.create(notifications)
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