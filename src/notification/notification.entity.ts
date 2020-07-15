import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, UpdateDateColumn } from "typeorm";

@Entity('notification')
export class NotificationEntity {

    @PrimaryGeneratedColumn()
    id: string;

    @CreateDateColumn()
    created_at: Date;

    @Column({ type: 'text', nullable: true })
    notification: string;

    @Column({ type: 'text', nullable: true })
    sender: string;

    @Column({ type: 'text', nullable: true })
    author: string;

    @Column({ type: 'text', nullable: true })
    receiver: string
}
