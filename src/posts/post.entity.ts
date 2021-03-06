import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToOne, UpdateDateColumn } from "typeorm";
import { UserEntity } from "src/users/user.entity";

@Entity('posts')
export class PostEntity {
    
    @PrimaryGeneratedColumn()
    id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column('text')
    title: string;

    @Column('text')
    cost: string;

    @Column('text')
    description: string;

    @Column('text')
    status: string;

    @Column('text')
    category: string;
    
    @Column('text')
    address: string;

    @Column('text')
    imgUrl: string;

    @Column({ default: false })
    isShow: boolean;

    @Column({ default: false })
    isBought: boolean;

    @ManyToOne(type => UserEntity, author => author.posts)
    author: UserEntity;

    @ManyToOne(type => UserEntity, follower => follower.followPosts)
    followers: UserEntity;
}
