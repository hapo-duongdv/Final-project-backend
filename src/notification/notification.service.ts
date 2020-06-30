import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from './notification.entity';
import { Repository, Like } from 'typeorm';
import { NotificationRO } from './notification.dto';

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(NotificationEntity)
        private notificationRepository: Repository<NotificationEntity>
    ) { }

    async create(data: NotificationRO) {
        await this.notificationRepository.create({ ...data });
        await this.notificationRepository.save({ ...data });
        return { ...data }
    }

    async show() {
        return await this.notificationRepository.find();
    }

    async read(id: string) {
        return await this.notificationRepository.findOne({ where: { id: id } });
    }

    async find(sender: string, receiver: string) {
        const chat1 = await this.notificationRepository.find({ where: { room: Like('%' + receiver + sender + '%') } });
        const chat2 = await this.notificationRepository.find({ where: { room: Like('%' + sender + receiver + '%') } });
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
        const chat = await this.notificationRepository.findOne({ where: { id: id } });
        if (!chat) {
            throw new HttpException('not found!', HttpStatus.NOT_FOUND);
        }
        return await this.notificationRepository.delete({ id });
    }

    async findUser(receiver: string) {
        const listChat = await this.notificationRepository.find({ where: { receiver: Like('%' + receiver + '%%') } })
        return listChat;
    }
}
