// import {
//   SubscribeMessage,
//   WebSocketGateway,
//   OnGatewayInit,
//   WebSocketServer,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
// } from '@nestjs/websockets';
// import { Logger } from '@nestjs/common';
// import { Socket, Server } from 'socket.io';

// @WebSocketGateway()
// export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

//   @WebSocketServer() server: Server;
//   private logger: Logger = new Logger('AppGateway');

//   public users : {id :"", name: string}
  

//   @SubscribeMessage('sendMessage')
//   handleMessage(client: Socket, message : {sender: string, mes: string}): void {
//     console.log(message)
//     this.server.emit('newMessage', message);
//   }

//   @SubscribeMessage('joinRoom')
//   handleJoinRoom(client: Socket, room: string): void {
//     client.join(room)
//     console.log(room)
//     this.server.emit('joinedRoom', room);
//   }

  
//   @SubscribeMessage('leaveRoom')
//   handleLeaveRoom(client: Socket, room: string): void {
//     client.leave(room)
//     console.log(room)
//     this.server.emit('leftRoom', room);
//   }

//   @SubscribeMessage('new-user')
//   handleUser(client: Socket, payload: string): void {
//     this.users = { id: client.id, name: payload }
//     // console.log(this.user)
//     this.server.emit('user-connected', payload) 
//     // => {
//     //   user[client.id] = payload
//     //   client.emit('user-connected', payload)
//     // })
//   }

//   afterInit(server: Server) {
//     this.logger.log('Init');
//   }

//   handleDisconnect(client: Socket) {
//     this.logger.log(`Client disconnected: ${client.id}`);
//   }

//   handleConnection(client: Socket, ...args: any[]) {
//     this.logger.log(`Client connected: ${client.id}`);
//     client.emit('connection', 'Connected!!')
//   }


// }