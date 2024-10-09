import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(private readonly prisma:PrismaService,
        private readonly jwtService: JwtService
    ) {}

    async login(dto: AuthDto) {
        const user = await this.validateUser(dto)
        const tokens = await this.issueTokenPair(user)

        return {
            user: {
                id: user.id,
                name: user.name
            },
            ...tokens,
        }
    }

    async register(dto: AuthDto) {
        const oldUser = await this.prisma.user.findFirst({
            where: {
                name: dto.name
            }
        })
        if(oldUser) throw new BadRequestException('user with this name is already in the system')

        const salt = await bcrypt.genSalt(10)
        const newUser = await this.prisma.user.create({
            data: {
                name: dto.name,
                password: await bcrypt.hash(dto.password, salt)
            }
        })

        const tokens = await this.issueTokenPair(newUser)

        return await {
            user: {
                id: newUser.id,
                name: newUser.name
            },
            ...tokens
        }
    }

    async validateUser(dto: AuthDto) {
        const user = await this.prisma.user.findFirst({
            where: {
                name: dto.name
            }
        })
        if(!user) throw new UnauthorizedException('user not found')
        const passwordCheck = await bcrypt.compare(dto.password, user.password)
        
        return user
    }

    async issueTokenPair(user: User) {
        const accessToken = await this.jwtService.signAsync(user, {
            secret: process.env.JWT_SECRET,
            expiresIn: '10d'
        })

        return await {accessToken}
    }
}
