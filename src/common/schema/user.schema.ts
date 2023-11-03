import { Prop, SchemaFactory, Schema, raw } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum Roles {
    Host = 'Host',
    User = 'User',
  }
@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  mobile_no: string;

  @Prop()
  password: string;

  @Prop({enum: [...Object.values(Roles)] })
  role: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
