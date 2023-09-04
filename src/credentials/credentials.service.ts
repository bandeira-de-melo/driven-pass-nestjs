import { ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { User } from '@prisma/client';
import { CredentialsRepository } from './credentials.repositiry';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { CryptrService } from '../cryptr/cryptr.service';

@Injectable()
export class CredentialsService {
  constructor(
    private readonly credentialsRepository: CredentialsRepository,
    private readonly cryptrService: CryptrService,
    ) {}

  async create(user: User, createCredentialDto: CreateCredentialDto) {

     const titleExists = await this.credentialsRepository.findOneWhitTitle(user.id, createCredentialDto.title);
     if (titleExists) throw new ConflictException("You Alredy Have a Credential With This Title");
     
     return await this.credentialsRepository.create(user.id, createCredentialDto)
  }

  async findAll(user: User) {
    const credentialsList = await this.credentialsRepository.findAll(user.id);
    if (credentialsList.length < 1) throw new NotFoundException("You Have No Credentials Registed.")
    const decryptedCredentials = credentialsList.map(credential => { return {...credential, password: this.cryptrService.decrypt(credential.password)}} )
    return decryptedCredentials;
  }

  async findOne(id: number, user: User) {
    const credential = await this.credentialsRepository.findOne(id);
    if (!credential) throw new NotFoundException({message:"Credential Not Found."})
    if (credential.userId !== user.id) throw new ForbiddenException({message: "You Are Not Allowed To Access This Credential."})
    return {... credential, password: this.cryptrService.decrypt(credential.password)}
  }

  update(id: number, updateCredentialDto: UpdateCredentialDto) {
    return `This action updates a #${id} credential`;
  }

  async remove(id: number, user: User) {
    const credential = await this.credentialsRepository.findOne(id);
    if (!credential) throw new NotFoundException({message:"Credential Not Found."})
    if (credential.userId !== user.id) throw new ForbiddenException({message: "You Are Not Allowed To Access This Credential."})
    return await this.credentialsRepository.remove(id);
  }
}
