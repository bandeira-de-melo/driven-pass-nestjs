import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword({
        minLength: 10, 
        minLowercase: 1, 
        minUppercase: 1, 
        minSymbols: 1
    })
    password: string;
}
