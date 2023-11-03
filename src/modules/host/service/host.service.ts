import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Host } from 'src/common/schema/host.schema';
import * as crypto from 'crypto';
import { AuthService } from 'src/common/auth/auth.service';
import { CreateEvent } from 'src/common/schema/createEvent.schema';
import { CloudinaryService } from 'src/common/cloudnary/cloudnary';

@Injectable()
export class HostService {
  constructor(
    @InjectModel(Host.name) private hostModel: Model<Host>,
    @InjectModel(CreateEvent.name)
    private CreateEventModel: Model<CreateEvent>,
    private readonly authservice: AuthService,
    private readonly CloudinaryService: CloudinaryService,
  ) {}

  async signUp(CreateHostDto) {
    const checkUser = await this.hostModel.find({
      $or: [
        { email: CreateHostDto.email },
        { mobile_no: CreateHostDto.mobile_no },
      ],
    });

    if (checkUser.length > 0) {
      if (checkUser.some((user) => user.email === CreateHostDto.email)) {
        return {
          status: false,
          message: 'Email already exists',
        };
      } else if (
        checkUser.some((user) => user.mobile_no === CreateHostDto.mobile_no)
      ) {
        return {
          status: false,
          message: 'Mobile number already exists',
        };
      }
    }

    const hashedPassword = crypto
      .createHash('sha256')
      .update(CreateHostDto.password)
      .digest('hex');
    const userWithHashedPassword = {
      ...CreateHostDto,
      password: hashedPassword,
      role: 'Host',
    };
    const new_user = await this.hostModel.create(userWithHashedPassword);
    return {
      status: true,
      message: 'successfully created a new user',
    };
  }

  async login(hostLoginDto) {
    try {
      let valUser: any = await this.hostModel.findOne({
        $or: [
          { email: hostLoginDto.email },
          { mobile_no: hostLoginDto.mobile_no },
        ],
      });

      if (!valUser) {
        return {
          status: false,
          message: 'User Not Found',
        };
      }
      const hashedPassword = crypto
        .createHash('sha256')
        .update(hostLoginDto.password)
        .digest('hex');

      if (hashedPassword !== valUser.password) {
        return {
          status: false,
          message: 'Password Not Found',
        };
      }
      delete valUser._doc.password;
      const token = await this.authservice.createAccessToken(valUser);
      return {
        status: 'success',
        message: 'Login successful',
        data: valUser,
        token: token,
      };
    } catch (error) {
      return {
        status: 'failed',
        message: error.message,
      };
    }
  }

  async uploadPoster(file) {
    try {
      const photo = await this.CloudinaryService.upload(file);
      return {
        status: true,
        data: photo,
      };
    } catch (error) {
      return {
        status: 'fail',
        message: 'Error while uploading file',
      };
    }
  }

  async event(createTicketDto, Id) {
    try {
      const eventData = {
        ...createTicketDto,
        hostId: Id,
      };
      const data = await this.CreateEventModel.create(eventData);
    } catch (error) {
      return {
        status: 'fail',
        message: error.message,
      };
    }
    const eventData = {
      ...createTicketDto,
      seats: parseInt(createTicketDto.seats),
      price: parseInt(createTicketDto.price),
      hostid: Id,
    };

    const data = await this.CreateEventModel.create(eventData);
    return {
      status: 'success',
      data: data,
    };
  }

  async eventList(id) {
    try {
      let host_id = new Types.ObjectId(id);
      const event = await this.CreateEventModel.find({ hostid: host_id });
      return { status: 'sucess', data: event };
    } catch (error) {
      return {
        status: 'Failed',
        message: 'Something went wrong',
      };
    }
  }

  async editEvent(file, updateTicketDto, eventId,hostId) {
    try {
      let updatePoster;
      if (file.length > 0) {
        updatePoster = await this.CloudinaryService.upload(file);
      }
      let event_id = new Types.ObjectId(eventId);
      const query:any = {
        $set: { ...updateTicketDto }
      }

      if(updatePoster?.length > 0){
        query.$push= { poster: { $each: updatePoster } }
      }
      
      const edit = await this.CreateEventModel.updateOne(
       {_id:event_id, hostid:new Types.ObjectId(hostId)},query,
        { new: true } 
      );
      if(edit?.modifiedCount == 0){
        return {
          status: 'falied',
          message:'No Event Found'
        };
      }
      
      return {
        status: 'Success',
        data: edit,
      };

    } catch (error) {
      return {
        status: 'falied',
        message: error.message,
      };
    }
  }
}
