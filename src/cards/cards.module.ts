import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { ConfigModule } from '../config/config.module';
import { CryptrModule } from '../cryptr/cryptr.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { CardsService } from './cards.service';
import { CardsRepository } from './cards.repositiry';

@Module({
  imports:[CryptrModule, ConfigModule, PrismaModule],
  controllers: [CardsController],
  providers: [CardsService, CardsRepository, PrismaService]
})
export class CardsModule {}
