import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { FollowerEntity } from './follower.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/user.entity';
import { FollowerDTO, FollowerRO } from './follower.dto';
import { UserRO } from 'src/users/user.dto';

@Injectable()
export class FollowersService {
    constructor(
        @InjectRepository(FollowerEntity)
        private followerRepository: Repository<FollowerEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }

    async follow(following: string, follower: FollowerEntity): Promise<FollowerEntity> {
        const user = await this.userRepository.findOne({ where: { id: following } });
        const id = follower.id;
        const follower1 = await this.userRepository.findOne({ where: { id: id } })
        if (!user) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
        }
        if (!follower1) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
        }
        const follow1 = await this.followerRepository.findOne({ where: { userFollowers: follower, userFollowing: following } });
        if (!follow1) {
            const follow: any = await this.followerRepository.create({ userFollowers: follower1, userFollowing: user })
            await this.followerRepository.save(follow)
            return follow;
        }
    }

    async getData(): Promise<FollowerEntity> {
        const follower: any = await this.followerRepository.find({ relations: ["userFollowers", "userFollowing"] })
        return follower;
    }

    async read(id: string): Promise<FollowerEntity> {
        const follower: any = await this.followerRepository.findOne({ where: { id: id }, relations: ["userFollowers", "userFollowing"] })
        return follower;
    }
    
    async delete(id: string) {
        const follow = await this.followerRepository.findOne({ where: { id }, relations: ["userFollowers", "userFollowing"] });
        if (!follow) {
            throw new HttpException("follow not found!", HttpStatus.NOT_FOUND)
        }
        return await this.followerRepository.delete({ id });
    }
}
