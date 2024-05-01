import amqp from 'amqplib'
import {Channel, Connection} from 'amqplib/callback_api'

export let connection:Connection;
export let channel:Channel;
export const amqpConnection = async () => {
        connection = await amqp.connect('amqp://localhost:5672');
        channel = await connection.createChannel();
        await channel.assertQueue('user-id');
        await channel.assertQueue('user-post');
};
