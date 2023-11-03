import { Module, ValidationPipe } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Host, HostSchema } from 'src/common/schema/host.schema';
import { HostService } from './service/host.service';
import { HostController } from './controller/host.controller';
import { CommonModule } from 'src/common/common.module';
import {
  CreateEvent,
  CreateEventSchema,
} from 'src/common/schema/createEvent.schema';
import { User, UserSchema } from 'src/common/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Host.name, schema: HostSchema },
      { name: CreateEvent.name, schema: CreateEventSchema },
      { name: User.name, schema: UserSchema }
    ]),
    CommonModule,
  ],
  controllers: [HostController],
  providers: [
    HostService,
  ],
})
export class HostModule {}
