import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { MulterModule } from '@nestjs/platform-express';
// import { AppGateway } from './app.gateway';
import { FollowersController } from './followers/followers.controller';
import { FollowersModule } from './followers/followers.module';
import { ChatModule } from './chat/chat.module';
import { NotificationModule } from './notification/notification.module';


@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, PostsModule, MulterModule.register({ dest: './uploads' }), FollowersModule, ChatModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
