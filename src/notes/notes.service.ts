import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateNoteDto } from './dto/update-notes.dto';
import { User } from '@prisma/client';
import { NotesRepository } from './notes.repositiry';
import { CreateNoteDto } from './dto/create-notes.dto';

@Injectable()
export class NotesService {
  constructor(
    private readonly notesRepository: NotesRepository,
    ) {}

  async create(user: User, createNoteDto: CreateNoteDto) {

     const titleExists = await this.notesRepository.findOneWhitTitle(user.id, createNoteDto.title);
     if (titleExists) throw new ConflictException("You Alredy Have a note With This Title");
     
     return await this.notesRepository.create(user.id, createNoteDto)
  }

  async findAll(user: User) {
    const notesList = await this.notesRepository.findAll(user.id);
    if (notesList.length < 1) throw new NotFoundException("You Have No Notes Registed.")
    return notesList;
  }

  async findOne(id: number, user: User) {
    const note = await this.notesRepository.findOne(id);
    if (!note) throw new NotFoundException({message:"note Not Found."})
    if (note.userId !== user.id) throw new ForbiddenException({message: "You Are Not Allowed To Access This Note."})
    return note;
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return `This action updates a #${id} note`;
  }

  async remove(id: number, user: User) {
    const note = await this.notesRepository.findOne(id);
    if (!note) throw new NotFoundException({message:"Note Not Found."})
    if (note.userId !== user.id) throw new ForbiddenException({message: "You Are Not Allowed To Access This Note."})
    return await this.notesRepository.remove(id);
  }
}
