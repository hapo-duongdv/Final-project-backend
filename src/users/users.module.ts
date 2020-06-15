import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { ChatGateway } from 'src/chat/chat.gateway';
import { ChatEntity } from 'src/chat/chat.entity';
import { ChatService } from 'src/chat/chat.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, ChatEntity])],
    controllers: [UsersController],
    providers: [UsersService, ChatGateway, ChatService]
})
export class UsersModule {}
