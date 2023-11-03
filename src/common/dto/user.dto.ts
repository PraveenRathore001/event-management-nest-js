import { IsString, IsEmail, IsInt, IsEnum, MinLength, Length, Matches, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;


  @Length(10, 10, {
    message: 'Phone number should contain exactly 10 digits.'
  })
  @Matches(/^[7-9]\d{9}$/, {
    message: 'Phone number should start with a digit between 7 and 9.'
  })
  mobile_no: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/, {
    message: 'Password too weak: e.g., Password123'
  })
  password: string;


}

export class UserLoginDto {

  @IsEmail()
  @IsOptional()
  email: string;

  
  @IsOptional()
  mobile_no: string;

  @IsString()
  password: string;

}
