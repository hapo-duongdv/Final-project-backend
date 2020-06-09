import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository, Any, Like } from 'typeorm';
import { UserDTO, UserRO } from './user.dto';
import * as jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer';
import { PostRO } from 'src/posts/post.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }

    private decoded(token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET);
            return decoded;
        }
        catch (err) {
            const message = 'Token error: ' + (err.message || err.name);
            throw new HttpException(message, HttpStatus.FORBIDDEN)

        }
    }

    async findOne(username: string): Promise<UserDTO> {
        const user = await this.userRepository.findOne({ where: { username: username } });
        return user;
    }

    getUserByToken(token) {
        return this.userRepository.findOne({ where: { token } })
    }

    async showAll(): Promise<UserRO[]> {
        const users = await this.userRepository.find({ relations: ['posts', 'listFollowers', 'followers', 'followPosts'] });
        return users.map(user => user.toResponseObject(false))
    }

    async read(id: string): Promise<UserRO> {
        const user = await this.userRepository.findOne({ where: { id }, relations: ['posts', 'listFollowers', 'followPosts'] });
        if (!user) {
            throw new HttpException("User not found!", HttpStatus.NOT_FOUND)
        }
        return user.toResponseObject(false);
    }

    async update(id: string, data: Partial<UserDTO>) {
        const { avatar } = data;
        const image = avatar;
        const user = await this.userRepository.findOne({ where: { id }, relations: ['posts', 'listFollowers'] });
        if (!user) {
            throw new HttpException("User not found!", HttpStatus.NOT_FOUND)
        }
        console.log(data)
        return this.userRepository.update({ id }, data);
    }

    async delete(id: string) {
        const user = await this.userRepository.findOne({ where: { id }, relations: ['posts', 'listFollowers'] });
        if (!user) {
            throw new HttpException("User not found!", HttpStatus.NOT_FOUND)
        }
        return await this.userRepository.delete({ id });
    }

    async getInfor(token: string) {
        const userDecode = await this.decoded(token);
        return userDecode;
    }

    async login(data) {
        const { username, password } = data;
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user) {
            throw new HttpException(
                'Invalid username/password',
                HttpStatus.BAD_REQUEST,
            )
        }
        return user.toResponseObject();
    }

    async register(data: UserDTO): Promise<UserRO> {
        const { username } = data;
        let user = await this.userRepository.findOne({ where: { username } });
        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        user = await this.userRepository.create(data);
        await this.userRepository.save(user);
        return user.toResponseObject(false);
    }

    async findByPayload(payload: any) {
        const { username } = payload;
        return await this.userRepository.findOne({ username });
    }

    async search(query: string): Promise<UserRO[]> {
        const users = await this.userRepository.find({ where: { username: Like('%' + query + '%%') }, relations: ['posts', 'listFollowers'] });
        if (!users) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return users.map(user => user.toResponseObject(false))

    }

    async changePassword(data, users: Partial<UserDTO>, id: string) {
        const user = await this.userRepository.findOne({ where: { id: id } });
        const { password } = user;
        if (users.password !== password) {
            throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
        }
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'duong080798@gmail.com',
                pass: 'sliverkun998'
            }
        });
        const url = `http://localhost:3000/confirm/${users.email}`
        const mailOptions = {
            from: 'duong080798@gmail.com', // sender address
            to: 'duongdv@haposoft.com', // list of receivers
            subject: 'Confirm email', // Subject line
            html: `Please click this mail to confirm your email : <a href =${url}>${url}</>`// plain text body
        };
        await transporter.sendMail(mailOptions, function (err, info) {
            if (err)
                console.log(err)
            else
                console.log(info);
        });
        return this.userRepository.update({ id }, data);
    }

    async follow(following: string, follower: Partial<UserRO>) {
        const user = await this.userRepository.findOne({ where: { id: following } })
        // console.log(follower)
        if (!user) {
            throw new HttpException('User not exists', HttpStatus.BAD_REQUEST);
        }
        var users = [];
        users.push(user);
        await this.userRepository.save({ ...follower, listFollowers: users })
        return { ...follower, listFollowers: users };
    }

    async unfollow(following: string, follower) {
        // const user = await this.userRepository.findOne({where :{email : following}})
        // if(!user){
        //     throw new HttpException('User not exists', HttpStatus.BAD_REQUEST);
        // }
        // const followers = await this.userRepository.findOne({where :{id : follower}})
        // if(!followers){
        //     throw new HttpException('User not exists', HttpStatus.BAD_REQUEST);
        // }
        // await user.listFollow.splice(parseInt(followers.id));
        // return user;
    }

    async followPost(id: string, post: Partial<PostRO>) {
        const user = await this.userRepository.findOne({ where: { id: id } })
        // console.log(follower)
        if (!user) {
            throw new HttpException('User not exists', HttpStatus.BAD_REQUEST);
        }
        var posts = [];
        posts.push(post);
        await this.userRepository.save({ ...user, followPosts: posts })
        return { ...user, followPosts: posts };
    }

    public async setAvatar(userId: string, avatarUrl: string) {
        const user: any = await this.userRepository.findOne({ where: { id: userId }, relations: ['posts', 'avatar'] });
        if (!user) {
            throw new HttpException("User not found!", HttpStatus.NOT_FOUND)
        }
        await this.userRepository.create({ ...user, avatar: avatarUrl });
        await this.userRepository.save({ ...user, avatar: avatarUrl });
        return { ...user, avatar: avatarUrl };
    }
}
