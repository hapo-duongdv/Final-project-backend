import { Module } from '@nestjs/common';
import { FollowersService } from './followers.service';

@Module({
  providers: [FollowersService]
})
export class FollowersModule {}
