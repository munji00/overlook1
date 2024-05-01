// auth/jwt.module.ts

import { Module } from '@nestjs/common';
import { authController } from '../controllers/auth.controller';
import { UserService } from 'src/services/user.service';
// import { SharedModule } from '../../shared/modules/shared.module';
import { ExistenceCheckInterceptor } from '../common/interceptors/isUserExist';
// import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../database/entities/user.entity';
import { DatabaseModule } from './database.module';
import { UserRepoProvider } from 'src/providers/userRepo.provider';
import { userModule } from './user.module';

@Module({
  imports: [DatabaseModule, userModule],
  controllers:[authController],
  providers: [
    {provide: 'ExistenceCheckInterceptor', useClass:ExistenceCheckInterceptor}
  ]
})
export class AuthModule {}