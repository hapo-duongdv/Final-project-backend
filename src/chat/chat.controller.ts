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

    @Get("/find/:room")
    find(@Param('room') room: string) {
        return this.chatService.find(room);
    }

    @Delete(":id")
    delete(@Param('id') id: string) {
        return this.chatService.delete(id);
    }
}
