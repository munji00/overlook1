import {connection, channel} from '../config/amqpConnection'
import { PostServices } from '../services/post';
import { publisher } from './publisher';

export const consumer = async (queue:string) => {
    try {
        channel.consume(queue, async (message:any) => {
        const userId = parseInt(message.content.toString(), 10);
        console.log('userId has been consumed from user-id queue' , userId);
        channel.ack(message);
        const post = await PostServices.fetchPostBy(userId)
        await publisher('user-post',post)
        });
    } catch (error) {
        console.error('Error sending posts data to queue:', error);
    }
};
