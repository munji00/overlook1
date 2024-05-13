import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib'


@Injectable()
export class RabbitMQClient {
    private connection: amqp.Connection;
    private channel: amqp.Channel;

    constructor(){
        this.connect()
        .then(() => console.log('Message broker Initialize'))
        .catch((error) => console.log('Error:', error.message))
    }

    private async connect() {
        this.connection = await amqp.connect('amqp://localhost:5672');
        this.channel = await this.connection.createChannel();
        await this.channel.assertQueue('user-id');
        await this.channel.assertQueue('user-post');
        await this.channel.assertQueue('friend_request');
        await this.channel.assertQueue('request_accepted');
    }

    async sendToQueue(queue:string, load:any) {
        await this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(load)));
    }

    async consumefromQueue(queue:string) {
        return new Promise<any>((resolve, reject) => {
            this.channel.consume(queue, async (message: any) => {
                const data = JSON.parse(message.content.toString());
                console.log(`message has been consumed from ${queue} queue`, data );
                this.channel.ack(message);
                resolve(data);
                await this.channel.close();
            }, { noAck: true });
        });
    }
}