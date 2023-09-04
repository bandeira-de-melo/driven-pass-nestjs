import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialsController } from './credentials.controller';
import { CredentialsRepository } from './credentials.repositiry';
import { ConfigModule } from '../config/config.module';
import { CryptrModule } from '../cryptr/cryptr.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports:[CryptrModule, ConfigModule, PrismaModule],
  controllers: [CredentialsController],
  providers: [CredentialsService, CredentialsRepository, PrismaService]
})
export class CredentialsModule {}
