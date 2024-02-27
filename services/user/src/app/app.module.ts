import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth.module';
import { userModule } from 'src/modules/user.module';

@Module({
  imports: [AuthModule, userModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
