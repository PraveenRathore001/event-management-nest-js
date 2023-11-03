import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/common/schema/user.schema';
import { UserService } from './service/user.service';
import { CommonModule } from 'src/common/common.module';
import { CreateEvent, CreateEventSchema } from 'src/common/schema/createEvent.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema },
      { name: CreateEvent.name, schema: CreateEventSchema },]),CommonModule
  ],
  controllers: [UserController],
  providers: [UserService,],
})
export class UserModule {}
