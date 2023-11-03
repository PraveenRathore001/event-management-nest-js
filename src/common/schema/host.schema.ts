import { Prop, SchemaFactory, Schema, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Roles {
    Host = 'Host',
    User = 'User',
  }

@Schema({ timestamps: true })
export class Host extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  mobile_no: number;

  @Prop()
  password: string;

  @Prop({enum: [...Object.values(Roles)] })
  role: string;
  
}

export const HostSchema = SchemaFactory.createForClass(Host);
