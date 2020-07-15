import { Controller, Get, Param, Delete } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService) { }

    @Get()
    showAll() {
        return this.chatService.show();
    }

    @Get("id")
    show(@Param('id') id: string) {
        return this.chatService.read(id);
    }

    @Get("/find/:sender/:receiver")
    find(@Param('sender') sender: string, @Param('receiver') receiver: string) {
        return this.chatService.find(sender, receiver);
    }

    
    @Get("/find-users/:user")
    findUser(@Param('user') user: string ) {
        return this.chatService.findUserChat(user);
    }

    @Delete(":id")
    delete(@Param('id') id: string) {
        return this.chatService.delete(id);
    }
}
