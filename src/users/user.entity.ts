import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert, OneToMany, ManyToOne, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { PostEntity } from "src/posts/post.entity";
import { FollowerEntity } from "src/followers/follower.entity";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @CreateDateColumn()
    created_at: Date;

    @Column({ type: 'text', nullable: true })
    username: string;

    @Column({ type: 'text', nullable: true })
    password: string;

    @Column({ type: 'text', nullable: true })
    name: string;

    @Column({ type: 'text', nullable: true })
    email: string;

    @Column({ type: 'text', nullable: true })
    address: string;

    @Column({ type: 'text', nullable: true })
    roles: string;

    @Column({ type: 'text', nullable: true })
    phone: string;

    @Column({ type: 'text', nullable: true })
    avatar: string;

    @OneToMany(type => PostEntity, post => post.author)
    posts: PostEntity[];

    @OneToMany(type => PostEntity, followPost => followPost.followers)
    followPosts: PostEntity[];

    @OneToMany(
        () => FollowerEntity,
        (uf: FollowerEntity) => uf.userFollowers
    )
    followers: FollowerEntity[]

    @OneToMany(
        () => FollowerEntity,
        (uf: FollowerEntity) => uf.userFollowing
    )
    following: FollowerEntity[]

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    public async hashPassword1(password) {
        return await bcrypt.hash(password , 10);
    }

    public toResponseObject(showToken: boolean = true) {
        const { id, created_at, name, username, token, roles, address, email, phone, followers, followPosts, avatar } = this;
        const responseObject: any = { id, created_at, name, username, address, roles, email, phone, token, followers, avatar, followPosts };
        if (showToken) {
            responseObject.token = token;
        }
        if (this.posts) {
            responseObject.posts = this.posts;
        }
        if (this.followPosts) {
            responseObject.followPosts = this.followPosts
        }
        if (this.following) {
            responseObject.following = this.following;
        }

        if (this.followers) {
            responseObject.follower = this.followers;
        }
        return responseObject;
    }

    async comparePassword(attempt: string) {
        return await bcrypt.compare(attempt, this.password);
    }

    public get token() {
        const { id, username, roles } = this;
        return jwt.sign({
            id, username, roles
        }, process.env.SECRET, { expiresIn: '2h' })
    }
}