import { Module } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowerEntity } from './follower.entity';
import { UserEntity } from 'src/users/user.entity';
import { FollowersController } from './followers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FollowerEntity, UserEntity])],
  controllers: [FollowersController],
  providers: [FollowersService]
})
export class FollowersModule {}
