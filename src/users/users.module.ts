import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { ChatGateway } from 'src/chat/chat.gateway';
import { ChatEntity } from 'src/chat/chat.entity';
import { ChatService } from 'src/chat/chat.service';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationEntity } from 'src/notification/notification.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, ChatEntity, NotificationEntity])],
    controllers: [UsersController],
    providers: [UsersService, ChatGateway, ChatService, NotificationService]
})
export class UsersModule {}
