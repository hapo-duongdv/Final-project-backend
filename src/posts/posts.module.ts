import { Module } from '@nestjs/common';
import { PostEntity } from './post.entity';
import { UserEntity } from 'src/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
    imports: [TypeOrmModule.forFeature([PostEntity, UserEntity])],
    controllers: [PostsController],
    providers: [PostsService]
})
export class PostsModule {}
