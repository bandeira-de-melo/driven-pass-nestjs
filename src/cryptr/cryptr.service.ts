import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import Cryptr from 'cryptr';

@Injectable()
export class CryptrService {
    cryptr = new Cryptr(this.config.get('CRYPTR_SECRET'));
    constructor(private readonly config: ConfigService) {
    }
    encrypt = this.cryptr.encrypt;
    decrypt = this.cryptr.decrypt;
}
