import { IsBooleanString, IsCreditCard, IsDateString, IsEnum, IsNotEmpty, IsNumberString, IsString, Matches, MaxLength, MinLength, validate } from "class-validator";

enum cardTypes {
    CREDIT = 'Credit',
    DEBIT = 'Debit',
    CREDIT_DEBIT='Credit/Debit'

}

export class CreateCardDto {
    @IsNotEmpty()
    @IsCreditCard()
    cardNumber: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    cardHolder: string;
    
    @IsNotEmpty()
    @IsNumberString()
    @MinLength(3)
    @MaxLength(3)
    cvv: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    password: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "The date Format Should Be MM/YY"})
    expirationDate: string;
    

    @IsString()
    @IsNotEmpty()
    title: string;

    
    @IsBooleanString()
    @IsNotEmpty()
    isVirtual: boolean
    
    @IsEnum(cardTypes)
    type: string;
}
