import { ConflictException, ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignInDto } from './dto/signIn.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
@Injectable()
export class AuthService {
    private EXPIRATION_TIME= "7 days";
    private ISSUER= "drivenpass";
    private AUDIENCE= "users";

    constructor(
        private readonly jwtService: JwtService, 
        private readonly userService: UserService
        ){ }

    async signIn(signInDto: SignInDto) {
        const{ email, password } = signInDto;

        const user = await this.userService.findOneByEmail(email);
        if(!user) throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
        const isMatch = bcrypt.compare(password, user.password);
        if(!isMatch) throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
        
        return this.generateToken(user);
    }

    async signUp(signUpdto: SignUpDto) {
        await this.userService.create(signUpdto);  
    }

    generateToken(user: User) {
        const { id, email } = user;
        const token = this.jwtService.sign(
            { email }, 
            { 
                expiresIn: this.EXPIRATION_TIME,
                subject: String(id),
                issuer: this.ISSUER,
                audience: this.AUDIENCE,
            }
        )
        return { token };
    }
}
