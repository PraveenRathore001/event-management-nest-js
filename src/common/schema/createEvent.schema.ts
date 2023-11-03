import { Prop, SchemaFactory, Schema, raw } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument, Types } from 'mongoose';
import { Host } from './host.schema';

export type CreateEventDocument = HydratedDocument<CreateEvent>;


@Schema({ timestamps: true })
export class CreateEvent extends Document {

  @Prop()
  title: string;

  @Prop()
  description : string;

  @Prop()
  seats: number;

  @Prop()
  poster:Array<String>;

  @Prop()
  venue: string;

  @Prop({
    type: {
      lat: { type: Number },
      log: { type: Number },
    },
  })
  location: { lat: number; log: number };;

  @Prop()
  price: number;

  @Prop()
  mobile_no: string;

  @Prop()
  time_from: string;

  @Prop()
  time_to: string;

  @Prop()
  date_from: string;

  @Prop()
  date_to: string;

  @Prop({default : true})
  enabled: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Host.name }) // Reference to the User schema
  hostid: Types.ObjectId;

  @Prop({default:0})
  register_user_count : number
}

export const CreateEventSchema = SchemaFactory.createForClass(CreateEvent);
