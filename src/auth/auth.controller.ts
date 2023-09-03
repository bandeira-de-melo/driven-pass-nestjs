import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @Post("sign-up")
    async signUp(@Body() signUpdto: SignUpDto) {
        await this.authService.signUp(signUpdto);
        return new HttpException('Account Created Successfully', HttpStatus.CREATED);
    }

    @Post("sign-in")
    async signIn(@Body() signInDto: SignInDto){
        return await this.authService.signIn(signInDto)
    }
}
