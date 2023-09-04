import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CredentialsModule } from './credentials/credentials.module';
import { ConfigModule } from './config/config.module';
import { CryptrModule } from './cryptr/cryptr.module';
import { NotesModule } from './notes/notes.module';
import { CardsModule } from './cards/cards.module';


@Module({
  imports: [PrismaModule, UserModule, AuthModule, CredentialsModule, CryptrModule, ConfigModule, NotesModule, CardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
