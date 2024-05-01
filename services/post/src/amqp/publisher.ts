import {connection, channel} from '../config/amqpConnection'

export const publisher = async (queue:string, message:any) => {
    try {
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        console.log('Posts data sent to queue');
    } catch (error) {
        console.error('Error sending posts data to queue:', error);
    }
};