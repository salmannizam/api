// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../common/dto/create-user.dto';
import { LoginDto } from '../common/dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) { }

  async login(loginDto: LoginDto) {
    // Find user by email
    // const user = await this.userService.findByUsername(loginDto.username);
    // if (user && await bcrypt.compare(loginDto.password, user.password)) {
    //   const payload = { email: user.email, sub: user.id };  // Use 'email' instead of 'username'
    //   return {
    //     access_token: this.jwtService.sign(payload),
    //   };
    // }

    return {
      access_token: "edsajdfkjdfgndfkgdf",
    };
    throw new UnauthorizedException('Invalid credentials');

  }

  async register(createUserDto: CreateUserDto) {
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;  // Store hashed password

    // Create and save the user
    return this.userService.create(createUserDto);
  }
}
