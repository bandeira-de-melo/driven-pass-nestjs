import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateCardDto } from './dto/update-card.dto';
import { User } from '@prisma/client';
import { CreateCardDto } from './dto/create-card.dto';
import { CryptrService } from '../cryptr/cryptr.service';
import { CardsRepository } from './cards.repositiry';

@Injectable()
export class CardsService {
  constructor(
    private readonly cardsRepository: CardsRepository,
    private readonly cryptrService: CryptrService,
  ) {}

  async create(user: User, createCardDto: CreateCardDto) {
    const titleExists = await this.cardsRepository.findOneWhitTitle(
      user.id,
      createCardDto.title,
    );
    if (titleExists)
      throw new ConflictException('You Alredy Have a Card With This Title');

    const expDate = this.convertMMYYToDate(createCardDto.expirationDate);
    const isoStringExpDate = expDate.toISOString();
    return await this.cardsRepository.create(
      user,
      createCardDto,
      isoStringExpDate,
    );
  }

  async findAll(user: User) {
    const cardsList = await this.cardsRepository.findAll(user.id);
    if (cardsList.length < 1)
      throw new NotFoundException('You Have No cards Registed.');
    const decryptedcards = cardsList.map((card) => {
      return {
        ...card,
        password: this.cryptrService.decrypt(card.password),
        cvv: this.cryptrService.decrypt(card.cvv),
      };
    });
    return decryptedcards;
  }

  async findOne(id: number, user: User) {
    const card = await this.cardsRepository.findOne(id);
    if (!card) throw new NotFoundException({ message: 'Card Not Found.' });
    if (card.userId !== user.id)
      throw new ForbiddenException({
        message: 'You Are Not Allowed To Access This Card.',
      });
    return {
      ...card,
      password: this.cryptrService.decrypt(card.password),
      cvv: this.cryptrService.decrypt(card.cvv),
    };
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} Card`;
  }

  async remove(id: number, user: User) {
    const card = await this.cardsRepository.findOne(id);
    if (!card) throw new NotFoundException({ message: 'Card Not Found.' });
    if (card.userId !== user.id)
      throw new ForbiddenException({
        message: 'You Are Not Allowed To Access This Card.',
      });
    return await this.cardsRepository.remove(id);
  }

  convertMMYYToDate(mmYyString: string): Date | null {
    // Split the "mm/yy" string into month and year components
    const [month, year] = mmYyString.split('/');

    // Check if the components are valid numbers
    const parsedMonth = parseInt(month, 10);
    const parsedYear = parseInt(year, 10);

    if (isNaN(parsedMonth) || isNaN(parsedYear)) {
      return null; // Invalid input
    }

    // Construct a date string in "yyyy-mm-dd" format (e.g., "2023-09-01")
    // Assuming a constant day component (e.g., 01 for the 1st day of the month)
    const yyyyMmDdString = `20${year}-${String(parsedMonth).padStart(
      2,
      '0',
    )}-01`;

    // Create a Date object from the formatted date string
    const date = new Date(yyyyMmDdString);

    return date;
  }
}
