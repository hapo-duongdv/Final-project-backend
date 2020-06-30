import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './chat.entity'
import { NotificationService } from 'src/notification/notification.service';
import { NotificationEntity } from 'src/notification/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatEntity, NotificationEntity])],
  controllers: [ChatController],
  providers: [ChatService, NotificationService]
})
export class ChatModule { }
