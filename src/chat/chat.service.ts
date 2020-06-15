import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ChatEntity } from './chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { ChatRO } from './chat.dto'

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(ChatEntity)
        private chatRepository: Repository<ChatEntity>
    ) { }

    async create(data: ChatRO) {
        await this.chatRepository.create({ ...data });
        await this.chatRepository.save({ ...data });
        return { ...data }
    }

    async show() {
        return await this.chatRepository.find();
    }

    async read(id: string) {
        return await this.chatRepository.findOne({ where: { id: id } });
    }

    async find(username: string) {
        const chat = await this.chatRepository.find({ where: { room: Like('%' + username + '%%') } });
        if(!chat) {
            throw new HttpException('not found!', HttpStatus.NOT_FOUND);
        }
        return chat;
    }

    async delete(id: string) {
        const chat = await this.chatRepository.findOne({ where: { id: id } });
        if(!chat) {
            throw new HttpException('not found!', HttpStatus.NOT_FOUND);
        }
        return await this.chatRepository.delete({ id });
    }
}
