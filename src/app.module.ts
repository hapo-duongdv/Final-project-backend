import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, PostsModule, MulterModule.register({ dest: './uploads' })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
