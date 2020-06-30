import { Controller, Get, Param, Delete } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
    constructor(private notificationService: NotificationService) { }

    @Get()
    showAll() {
        return this.notificationService.show();
    }

    @Get("id")
    show(@Param('id') id: string) {
        return this.notificationService.read(id);
    }

    @Get("/find/:sender/:receiver")
    find(@Param('sender') sender: string, @Param('receiver') receiver: string) {
        return this.notificationService.find(sender, receiver);
    }

    
    @Get("/find-users/:receiver")
    findUser(@Param('receiver') receiver: string ) {
        return this.notificationService.findUser(receiver);
    }

    @Delete(":id")
    delete(@Param('id') id: string) {
        return this.notificationService.delete(id);
    }
}
