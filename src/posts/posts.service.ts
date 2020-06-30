import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { UserEntity } from 'src/users/user.entity';
import { PostEntity } from './post.entity';
import { PostDTO, PostRO } from './post.dto';
import { UserRO, UserDTO } from 'src/users/user.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }

    private toResponseObjectTask(posts: PostEntity): PostRO {
        return {
            ...posts
            // tasks.projects
        }
    }

    async showAll() {
        const posts = await this.postRepository.find({ relations: ['author'], order: {id : "DESC"}  });
        return posts;
    }

    async show(page : number = 1) {
        const posts = await this.postRepository.find({ relations: ['author'], take: 4, skip: 4 *(page -1), order: {id : "DESC"} });
        return posts;
    }

    async create(data: PostDTO, userId: string): Promise<PostRO> {
        const { imgUrl } = data;
        const image = imgUrl;
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new HttpException('user not found!', HttpStatus.NOT_FOUND);
        }
        const posts = await this.postRepository.create({ ...data, imgUrl: image, author: user });
        await this.postRepository.save(posts);
        return this.toResponseObjectTask(posts);
    }

    async read(id: string): Promise<PostRO> {
        const post = await this.postRepository.findOne({ where: { id }, relations: ['author'] });
        if (!post) {
            throw new HttpException('Post not found!', HttpStatus.NOT_FOUND);
        }
        return this.toResponseObjectTask(post);
    }

    async update(id: string, data: Partial<PostDTO>): Promise<PostRO> {
        let post = await this.postRepository.findOne({ where: { id }, relations: ['author'] })
        if (!post) {
            throw new HttpException('post not found!', HttpStatus.NOT_FOUND);
        }
        await this.postRepository.update({ id }, data);
        post = await this.postRepository.findOne({ where: { id }, relations: ['author'] });
        return this.toResponseObjectTask(post);
    }

    async delete(id: string) {
        const post = await this.postRepository.findOne({ where: { id }, relations: ['author'] });
        if (!post) {
            throw new HttpException('post not found!', HttpStatus.NOT_FOUND);
        }
        await this.postRepository.delete({ id });
        return this.toResponseObjectTask(post);
    }

    
    async follower(id : string, user: UserRO){
        const post = await this.postRepository.findOne({where :{id : id}})
        // console.log(id)
        if(!post){
            throw new HttpException('User not exists', HttpStatus.BAD_REQUEST);
        }
        await this.postRepository.create({...post, followers: user });
        await this.postRepository.save({...post, followers: user })
        return {...post, followers: user};
    }

    async unfollow(id : string, user: UserRO){
        const post = await this.postRepository.findOne({where :{id : id}})
        // console.log(id)
        if(!post){
            throw new HttpException('post not exists', HttpStatus.BAD_REQUEST);
        }
        await this.postRepository.delete({ followers: user });
        return {...post};
    }

    async search(query: string): Promise<PostRO[]> {
        console.log(query)
        const posts = await this.postRepository.find({ where: { title: Like('%' + query + '%%') }, relations: ['author'] });
        if (!posts) {
            throw new HttpException('Posts not found', HttpStatus.NOT_FOUND);
        }
        return posts;
    }
}
