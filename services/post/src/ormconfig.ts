// ormconfig.ts
import { ConnectionOptions } from 'typeorm';
import UserPost from './entities/post.entity';
import PostLikes from './entities/postLikes.entity';
import PostComments from './entities/postComments.entity';
import PostShares from './entities/postShares.entity';

const config: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '@mu786mu@',
  database: 'post',
  synchronize: true,
  logging: false,
  entities: [UserPost, PostLikes, PostComments, PostShares],
};

export default config;

  