import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert, OneToMany, ManyToOne, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { PostEntity } from "src/posts/post.entity";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @CreateDateColumn()
    created_at: Date;

    @Column({type :'text', nullable: true})
    username: string;

    @Column({type :'text', nullable: true})
    password: string;

    @Column({type :'text', nullable: true})
    name: string;

    @Column({type :'text', nullable: true})
    email: string;

    @Column({type :'text', nullable: true})
    address: string;

    @Column({type :'text', nullable: true})
    roles: string;

    @Column({type :'text', nullable: true})
    phone: string;

    @Column({type :'text', default: null})
    listFollow: string;

    @OneToMany(type => PostEntity, post => post.author)
    posts : PostEntity[];

    @OneToMany(type => UserEntity, listFollower => listFollower.followers)
    listFollowers : UserEntity[];

    @ManyToOne(type => UserEntity, listFollow => listFollow.followers)
    followers : UserEntity;

    @OneToOne(type => UserEntity, avatar => avatar.user)
    @JoinColumn()
    avatar : UserEntity;

    @OneToOne(type => UserEntity, user => user.avatar)
    @JoinColumn()
    user: UserEntity;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    public toResponseObject(showToken: boolean = true) {
        const { id, created_at, name, username, token, roles, address, email, phone, listFollow } = this;
        const responseObject : any = { id, created_at, name,  username, address, roles , email, phone, token, listFollow };
        if(showToken){
            responseObject.token = token;
        }
        if(this.posts) {
            responseObject.posts = this.posts;
        }
        return responseObject;
    }

    async comparePassword(attempt: string) {
        return await bcrypt.compare(attempt, this.password);
    }

    private get token(){
        const { id, username, roles } =  this;
        return jwt.sign({
            id, username, roles
        }, process.env.SECRET, {expiresIn: '2h'})
    } 
}