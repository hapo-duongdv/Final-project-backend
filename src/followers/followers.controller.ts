import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowerEntity } from './follower.entity';
import { FollowerDTO } from './follower.dto';

@Controller('followers')
export class FollowersController {
    constructor(private followersService: FollowersService) { }

    @Get()
    getAll() {
        return this.followersService.getData()
    }

    @Get(":id")
    read(@Param("id") id: string) {
        return this.followersService.read(id)
    }

    @Post(":id")
    follow(@Param("id") id: string, @Body() data: FollowerEntity) {
        return this.followersService.follow(id, data);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.followersService.delete(id)
    }
}
