import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ChatEntity } from './chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { ChatRO } from './chat.dto'
import { where } from 'sequelize';
import { send } from 'process';


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

    async find(sender: string, receiver: string) {
        const chat1 = await this.chatRepository.find({ where: { room: Like('%' + receiver + sender + '%') } });
        const chat2 = await this.chatRepository.find({ where: { room: Like('%' + sender + receiver + '%') } });
        if (!chat1) {
            throw new HttpException('not found!', HttpStatus.NOT_FOUND);
        }
        var chats = [];
        for (let chat of chat1) {
            chats.push(chat);
        }
        for (let chat of chat2) {
            chats.push(chat);
        }
        return chats.sort((a, b) => (a.id > b.id) ? 1 : -1);
    }

    async delete(id: string) {
        const chat = await this.chatRepository.findOne({ where: { id: id } });
        if (!chat) {
            throw new HttpException('not found!', HttpStatus.NOT_FOUND);
        }
        return await this.chatRepository.delete({ id });
    }

    async findUserChat(user: string) {
        const listChat1 = await this.chatRepository.find({ where: { receiver: Like('%' + user + '%%') } })
        const listChat2 = await this.chatRepository.find({ where: { sender: Like('%' + user + '%%') } })
        var chats = [];
        for (let chat of listChat1) {
            chats.push(chat);
        }
        for (let chat of listChat2) {
            chats.push(chat);
        }
        return chats;
    }
}
