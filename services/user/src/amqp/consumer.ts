import * as amqp from 'amqplib';

export class RabbitMQClient {
    private connection: amqp.Connection;
    private channel: amqp.Channel;

    private async connect() {
        this.connection = await amqp.connect('amqp://localhost:5672');
        this.channel = await this.connection.createChannel();
        await this.channel.assertQueue('user-id');
        await this.channel.assertQueue('user-post');
    }

    async sendToQueue(queue:string, message:any) {
        await this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    }

    async consumefromQueue(queue:string) {
        await this.connect();
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