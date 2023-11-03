import { Module } from '@nestjs/common';
import 'dotenv/config'
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from './schema/user.schema';
import { CloudinaryService } from './cloudnary/cloudnary';
import { AuthGuard } from './auth/guards/auth.guard';
import { RoleGuard } from './auth/guards/role.guard';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
    global: true,
    secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    signOptions: { expiresIn: "1h" },
  })],
  providers: [AuthService,CloudinaryService,AuthGuard,RoleGuard],
  exports: [AuthService,CloudinaryService,AuthGuard,RoleGuard]
})
export class CommonModule {}
