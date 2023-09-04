import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';

@UseGuards(AuthGuard)
@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post('/')
  async create(@Body() createCredentialDto: CreateCredentialDto, @User() user: UserPrisma) {
    await this.credentialsService.create(user, createCredentialDto);
    return new HttpException("Credetial Created", HttpStatus.CREATED);
  }

  @Get('/')
  findAll(@User() user: UserPrisma) {
    return this.credentialsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserPrisma) {
    return this.credentialsService.findOne(+id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCredentialDto: UpdateCredentialDto) {
    return this.credentialsService.update(+id, updateCredentialDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() user: UserPrisma) {
    await this.credentialsService.remove(+id, user);
    return new HttpException("Credential Removed Successfully.", HttpStatus.OK)
  }
}
