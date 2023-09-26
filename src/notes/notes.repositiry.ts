import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-notes.dto';
import { UpdateNoteDto } from './dto/update-notes.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: number, createNoteDto: CreateNoteDto) {
    return this.prisma.note.create({
      data: { ...createNoteDto, userId },
    });
  }

  async findAll(userId: number) {
    return await this.prisma.note.findMany({ where: { userId } });
  }

  async findOne(id: number) {
    return await this.prisma.note.findUnique({ where: { id } });
  }

  findOneWhitTitle(userId: number, title: string) {
    return this.prisma.note.findUnique({
      where: {
        title_userId: {
          userId,
          title,
        },
      },
    });
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return this.prisma.note.update({ where: { id }, data: updateNoteDto });
  }

  remove(id: number) {
    return this.prisma.note.delete({ where: { id } });
  }
}
