import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NotesRepository } from './notes.repositiry';
import { UserModule } from '../user/user.module';

@Module({
  imports:[PrismaModule , UserModule],
  controllers: [NotesController],
  providers: [NotesService, NotesRepository, PrismaService]
})
export class NotesModule {}
