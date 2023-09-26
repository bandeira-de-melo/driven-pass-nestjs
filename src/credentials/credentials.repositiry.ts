import { Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';

import { CryptrService } from '../cryptr/cryptr.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CredentialsRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cryptrService: CryptrService,
  ) {}

  create(userId: number, createCredentialDto: CreateCredentialDto) {
    return this.prisma.credential.create({
      data: {
        ...createCredentialDto,
        password: this.cryptrService.encrypt(createCredentialDto.password),
        userId,
      },
    });
  }

  async findAll(userId: number) {
    return await this.prisma.credential.findMany({ where: { userId } });
  }

  async findOne(id: number) {
    return await this.prisma.credential.findUnique({ where: { id } });
  }

  findOneWhitTitle(userId: number, title: string) {
    return this.prisma.credential.findUnique({
      where: {
        title_userId: {
          userId,
          title,
        },
      },
    });
  }

  update(id: number, updateCredentialDto: UpdateCredentialDto) {
    return this.prisma.credential.update({
      where: { id },
      data: updateCredentialDto,
    });
  }

  remove(id: number) {
    return this.prisma.credential.delete({ where: { id } });
  }
}
