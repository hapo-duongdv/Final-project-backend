import { v4 } from 'uuid'
import { redis } from '../redis'

export const confirmEmail = async (userId: string) => {
    const id = v4();
    await redis.set(id, userId);
    return `http://localhost:4000/users/confirm/${id}`
}