import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/common/schema/user.schema';
import * as crypto from 'crypto';
import { AuthService } from 'src/common/auth/auth.service';
import { CreateEvent } from 'src/common/schema/createEvent.schema';
import { CreateUserDto } from 'src/common/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(CreateEvent.name) private eventModel: Model<CreateEvent>,
    private readonly authservice: AuthService,
  ) {}

  async signUp(createUserDto:CreateUserDto) {
    const checkUser = await this.userModel.find({
      $or: [
        { email: createUserDto.email },
        { mobile_no: createUserDto.mobile_no },
      ],
    });

    if (checkUser.length > 0) {
      if (checkUser.some((user) => user.email === createUserDto.email)) {
        return {
          status: false,
          message: 'Email already exists',
        };
      } else if (
        checkUser.some((user) => user.mobile_no === createUserDto.mobile_no)
      ) {
        return {
          status: false,
          message: 'Mobile number already exists',
        };
      }
    }

    const hashedPassword = crypto
      .createHash('sha256')
      .update(createUserDto.password)
      .digest('hex');
    const userWithHashedPassword = {
      ...createUserDto,
      password: hashedPassword,
      role: 'User',
    };
    const new_user = await this.userModel.create(userWithHashedPassword);
    return {
      status: true,
      message: 'successfully created a new user',
    };
  }

  async login(userLoginDto) {
    let valUser: any = await this.userModel.findOne({
      $or: [
        { email: userLoginDto.email },
        { mobile_no: userLoginDto.mobile_no },
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
      .update(userLoginDto.password)
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
  }

  async eventList(page, limit) {
    try {
      const list = await this.eventModel
        .find()
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const count = await this.eventModel.countDocuments();

      return {
        list,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    } catch (error) {
      return {
        status: 'failed',
        message: error.message,
      };
    }
  }
}
