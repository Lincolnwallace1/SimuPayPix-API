import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeormModule } from './common/typeorm/typeorm.module';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeormModule,
    AuthModule,
    UserModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
