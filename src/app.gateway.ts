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

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  public user : {id :"", name: string}
  

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, payload: string): void {
    console.log(this.user.name)
    this.server.emit('newMessage', {message : payload, user : this.user.name});
  }

  @SubscribeMessage('new-user')
  handleUser(client: Socket, payload: string): void {
    this.user = { id: client.id, name: payload }
    // console.log(this.user)
    this.server.emit('user-connected', payload) 
    // => {
    //   user[client.id] = payload
    //   client.emit('user-connected', payload)
    // })
  }

  @SubscribeMessage('disconncet')
  handleDisconnected(client: Socket, payload: string): void {
    console.log(this.user)
    this.server.emit('user-disconnected', payload) 
    delete this.user;
    // => {
    //   user[client.id] = payload
    //   client.emit('user-connected', payload)
    // })
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