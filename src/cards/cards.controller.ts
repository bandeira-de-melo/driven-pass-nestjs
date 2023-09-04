import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';
import { CardsService } from './cards.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('cards')
@UseGuards(AuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}


  @Post('/')
  @ApiOperation({ summary: "Creates A New Record For User Card" })
  async create(@Body() createcardDto: CreateCardDto, @User() user: UserPrisma) {
    await this.cardsService.create(user, createcardDto);
    return new HttpException("Card Created", HttpStatus.CREATED);
  }

  @Get('/')
  @ApiOperation({ summary: "Returns All User's Cards Records." })
  findAll(@User() user: UserPrisma) {
    return this.cardsService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({ summary: "Returns A Single User's Card Record." })
  findOne(@Param('id') id: string, @User() user: UserPrisma) {
    return this.cardsService.findOne(+id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatecardDto: UpdateCardDto) {
    return this.cardsService.update(+id, updatecardDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Deletes A Single User's Card Record." })
  async remove(@Param('id') id: string, @User() user: UserPrisma) {
    await this.cardsService.remove(+id, user);
    return new HttpException("Card Removed Successfully.", HttpStatus.OK)
  }
}
