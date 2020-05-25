import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/user.entity';
import { PostEntity } from './post.entity';
import { PostDTO, PostRO } from './post.dto';

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

    // private ensureOwnership(task: TaskEntity, userId: string, projectId: string) {
    //     if (task.author.id !== userId) {
    //         throw new HttpException('Incorret user', HttpStatus.UNAUTHORIZED);
    //     }
    //     // if (task.project.id !== projectId ) {
    //     //     throw new HttpException('Incorret project', HttpStatus.NOT_FOUND);
    //     // }
    // }

    async showAll() {
        // const tasks =  await this.taskRepository.find({relations: ['author']});
        // return tasks.map(task => this.toResponseObjectTask(task));
        const posts = await this.postRepository.find();
        return posts;
    }

    async create( data: PostDTO): Promise<PostRO> {
        // const user = await this.userRepository.findOne({ where: { id: userId } });
        // if (!user) {
        //     throw new HttpException('user not found!', HttpStatus.NOT_FOUND);
        // }
        const posts = await this.postRepository.create({ ...data});
        await this.postRepository.save(posts);
        return this.toResponseObjectTask(posts);
    }

    async read(id: string): Promise<PostRO> {
        const post = await this.postRepository.findOne({ where: { id } });
        if (!post) {
            throw new HttpException('Post not found!', HttpStatus.NOT_FOUND);
        }
        return this.toResponseObjectTask(post);
    }

    async update(id: string, data: Partial<PostDTO>): Promise<PostRO> {
        let post = await this.postRepository.findOne({ where: { id }})
        if (!post) {
            throw new HttpException('post not found!', HttpStatus.NOT_FOUND);
        }
        await this.postRepository.update({ id }, data);
        post = await this.postRepository.findOne({ where: { id }});
        return this.toResponseObjectTask(post);
    }

    async delete(id: string) {
        const post = await this.postRepository.findOne({ where: { id }});
        if (!post) {
            throw new HttpException('post not found!', HttpStatus.NOT_FOUND);
        }
        await this.postRepository.delete({ id });
        return this.toResponseObjectTask(post);
    }
}
