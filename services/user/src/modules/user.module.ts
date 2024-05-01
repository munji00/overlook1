import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { userController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { DatabaseModule } from './database.module';
import { UserRepoProvider } from '../providers/userRepo.provider';
import { ProfileRepoProvider } from '../providers/profileRepo.provider';
import { AssetsRepoProvider } from '../providers/assetsRepo.provider';
import { MulterMiddleware } from '../common/middlewares/multer.middleware';
import { ActivityRepoProvider } from '../providers/activityRepo.provider';

@Module({
  imports: [DatabaseModule],
  controllers:[userController],
  providers:[
    ...UserRepoProvider,
    ...ProfileRepoProvider,
    ...AssetsRepoProvider,
    ...ActivityRepoProvider,
    UserService
],
  exports:[
    ...UserRepoProvider,
    ...ProfileRepoProvider,
    ...AssetsRepoProvider,
    ...ActivityRepoProvider,
    UserService
]
})
export class userModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MulterMiddleware)
      .forRoutes(
        { path: 'user/upload/profile_img', method: RequestMethod.PUT },
        { path: 'user/upload/back_img', method: RequestMethod.PUT }
        );
  }
}