import { Global, Module } from '@nestjs/common';
import { CryptrService } from './cryptr.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Global()
@Module({
  imports:[ConfigModule],
  providers: [CryptrService],
  exports: [CryptrService]
})
export class CryptrModule {}
