import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Timestamp, JoinTable, ManyToMany } from 'typeorm'
import { UserEntity } from 'src/users/user.entity'

@Entity('followers')
export class FollowerEntity {

    @PrimaryGeneratedColumn()
    id: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @ManyToOne(
        () => UserEntity,
        (u: UserEntity) => u.followers
    )
    @JoinColumn()
    userFollowers: UserEntity

    @ManyToOne(
        () => UserEntity,
        (u: UserEntity) => u.following
    )
    @JoinColumn()
    userFollowing: UserEntity
}