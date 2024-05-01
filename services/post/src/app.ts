import "reflect-metadata"
import express, {Express} from 'express'
import { AppDataSource } from '../data-source';
import postRoutes from './routes/post';
import { amqpConnection} from "../src/config/amqpConnection";
import { publisher } from "./amqp/publisher";
import { consumer } from "./amqp/consumer";

const app:Express = express();

app.use(express.json())

app.use('/post', postRoutes)

AppDataSource.initialize()
    .then(() => {
      app.listen(3001, () => {
        console.log('Server is running on port 3001 and database connected successfully');
      });
    })
    .catch((error) => console.log(error))

amqpConnection().then(()=>{
  console.log('amqp connection established')
  consumer('user-id')
}).catch((err)=>{
  console.log(err);
})