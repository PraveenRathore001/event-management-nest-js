import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { HostService } from '../service/host.service';
import { CreateHostDto, HostLoginDto } from 'src/common/dto/host.dto';
import { CreateEventDto, UpdateTicketDto } from 'src/common/dto/createTicket.dto';
import {
  AnyFilesInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { imageOptions, updateImageOptions } from 'src/common/pipe/check.file';
import { AuthGuard } from 'src/common/auth/guards/auth.guard';
import { RoleGuard } from 'src/common/auth/guards/role.guard';
import { Roles } from 'src/common/schema/host.schema';
import { ExtractId } from 'src/common/pipe/extract_id';

@Controller('host')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @Post('sign_up')
  signUp(@Body() CreateUserDto: CreateHostDto) {
    return this.hostService.signUp(CreateUserDto);
  }

  @Post('login')
  login(@Body() hostLoginDto: HostLoginDto) {
    return this.hostService.login(hostLoginDto);
  }

  @Post("upload")
  @UseGuards(AuthGuard, new RoleGuard(Roles.Host))
  @UseInterceptors(FilesInterceptor('poster', 100, imageOptions))
  uploadPoster(
    @UploadedFiles() files: Array<Express.Multer.File>,
  ){
    return this.hostService.uploadPoster(files)
  }

  @Post('create_event')
  @UseGuards(AuthGuard, new RoleGuard(Roles.Host))
  ticket(
    @Body() createTicketDto: CreateEventDto,
    @ExtractId() Id: string,
  ) {
    return this.hostService.event(createTicketDto,Id);
  }

  @Get("list")
  @UseGuards(AuthGuard, new RoleGuard(Roles.Host))
  list( @ExtractId() Id: string,){    
    return this.hostService.eventList(Id)
}

 @Patch("edit_event")
 @UseInterceptors(FilesInterceptor('poster', 100, updateImageOptions))
 editEvent(
  @ExtractId() hostId: string,
  @Query("id") eventId : any,
  @UploadedFiles() files: Array<Express.Multer.File>,
  @Body() updateTicketDto : UpdateTicketDto
 ){
  
 return this.hostService.editEvent(files,updateTicketDto,eventId,hostId)
}
}
