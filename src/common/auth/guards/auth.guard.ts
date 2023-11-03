import {CanActivate,ExecutionContext,Injectable,UnauthorizedException,} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import 'dotenv/config'
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from 'src/common/schema/user.schema';

  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
        @InjectModel(User.name) private userSchema : Model<UserDocument>,
        private jwtService: JwtService
      ) {}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException({success: false,message :"UNAUTHORIZED"});
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: process.env.JWT_ACCESS_TOKEN_SECRET
          }
        );
        // console.log(payload,'payload');
        

        // const id = new mongoose.Types.ObjectId(payload.id); 
        // console.log(id,"id");
        
        // const isValid = await this.userSchema.findById(id)
        // console.log(isValid,"isValid");
        
        // if(!isValid){
        //   throw new UnauthorizedException({success:false, message:"UNAUTHORIZED"});
        // }

        request['user'] = payload;
      } catch {
        throw new UnauthorizedException({success:false, message:"UNAUTHORIZED"});
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }