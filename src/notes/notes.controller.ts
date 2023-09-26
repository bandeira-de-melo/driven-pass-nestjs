import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';
import { UpdateNoteDto } from './dto/update-notes.dto';
import { CreateNoteDto } from './dto/create-notes.dto';

@UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('/')
  async create(@Body() createNoteDto: CreateNoteDto, @User() user: UserPrisma) {
    await this.notesService.create(user, createNoteDto);
    return new HttpException('Note Created', HttpStatus.CREATED);
  }

  @Get('/')
  findAll(@User() user: UserPrisma) {
    return this.notesService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserPrisma) {
    return this.notesService.findOne(+id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() user: UserPrisma) {
    await this.notesService.remove(+id, user);
    return new HttpException('Note Removed Successfully.', HttpStatus.OK);
  }
}
