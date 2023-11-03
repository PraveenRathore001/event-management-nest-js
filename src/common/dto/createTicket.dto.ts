import { IsString, IsNumber, IsArray, IsLatitude, IsLongitude, IsDate, IsISO8601, IsBoolean, IsOptional, IsNotEmpty, MaxLength, MinLength, Matches, Length } from 'class-validator';


export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  seats: number;

  @IsNotEmpty()
  poster: string[];

  @IsString()
  @IsNotEmpty()
  venue: string;

  @IsOptional()
  @IsString()
  lat: number;

  @IsOptional()
  @IsString()
  log: number;

  @IsNotEmpty()
  price: number;

  @IsString()
  time_from: string;

  @IsString()
  time_to: string;

  @IsString()
  date_from: string;

  @IsString()
  date_to: string;

  @IsNotEmpty()
  @IsBoolean()
  enabled: boolean;

  @IsString()
  @Length(10, 10, {
    message: 'Phone number should contain exactly 10 digits.'
  })
  @Matches(/^[7-9]\d{9}$/, {
    message: 'Phone number should start with a digit between 7 and 9.'
  })
  mobile_no: string;
}


export class UpdateTicketDto {
  @IsString()
  @IsOptional() // Make title optional if it can be updated
  title?: string;

  @IsString()
  @IsOptional() // Make description optional if it can be updated
  description?: string;

  @IsNotEmpty()
  @IsOptional()
  seats: number;

  @IsOptional() // Make poster optional if it can be updated
  poster?: string[];

  @IsString()
  @IsOptional() // Make venue optional if it can be updated
  venue?: string;

  @IsLatitude()
  @IsOptional()
  lat?: number;

  @IsLongitude()
  @IsOptional()
  log?: number;

  @IsNotEmpty()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional() // Make time_from optional if it can be updated
  time_from?: string;

  @IsString()
  @IsOptional() // Make time_to optional if it can be updated
  time_to?: string;

  @IsString()
  @IsOptional() // Make date_from optional if it can be updated
  date_from?: string;

  @IsString()
  @IsOptional() // Make date_to optional if it can be updated
  date_to?: string;

  @IsNotEmpty()
  @IsOptional()
  enabled: boolean;
}


