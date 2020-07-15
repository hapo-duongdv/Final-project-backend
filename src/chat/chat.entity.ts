import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, UpdateDateColumn } from "typeorm";

@Entity('chat')
export class ChatEntity {

    @PrimaryGeneratedColumn()
    id: string;

    @CreateDateColumn()
    created_at: Date;

    @Column({ type: 'text', nullable: true })
    message: string;

    @Column({ type: 'text', nullable: true })
    sender: string;

    @Column({ type: 'text', nullable: true })
    room: string;

    @Column({ type: 'text', nullable: true })
    receiver: string
}
