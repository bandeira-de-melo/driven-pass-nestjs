import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CryptrService } from '../cryptr/cryptr.service';
import { PrismaService } from '../prisma/prisma.service';
import { Card, User as UserPrisma } from '@prisma/client';


@Injectable()
export class CardsRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cryptrService: CryptrService
    ){}

  create(user: UserPrisma, createCardDto: CreateCardDto, isoStringExpDate: string): Promise<Card> {
    return this.prisma.card.create({
        data:{
            ...createCardDto,
            cvv: this.cryptrService.encrypt(createCardDto.cvv),
            password: this.cryptrService.encrypt(createCardDto.password),
            expirationDate: new Date(isoStringExpDate),
            user: {
              connect: user
            }
        } 
    });
  }

  

  async findAll(userId: number) {
    return await this.prisma.card.findMany({ where:{ userId } });
  }

  async findOne(id: number) {
    return await this.prisma.card.findUnique({ where: { id }});
  }

  findOneWhitTitle(userId: number, title: string) {
    return this.prisma.card.findUnique({
        where: {
         title_userId: {
            userId,
            title,
         }   
        }
    });
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} credential`;
  }

  remove(id: number) {
    return this.prisma.credential.delete({ where: { id } });
  }

}