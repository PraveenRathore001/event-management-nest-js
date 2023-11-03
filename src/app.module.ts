import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HostModule } from './modules/host/host.module';
import { UserController } from './modules/user/controller/user.controller';
import { UserModule } from './modules/user/user.module';
import { CommonModule } from './common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  MongooseModule.forRoot(process.env.DB_URL),HostModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
