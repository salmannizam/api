// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../common/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async login(username: string, password: string) {
    // Validate user credentials
    const user = await this.userService.findByUsername(username);
    if (user && user.password === password) {  // Replace with bcrypt in production
      const payload = { username: user.username, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new Error('Invalid credentials');
  }

  async register(createUserDto: CreateUserDto) {
    // Create a new user (admin)
    return this.userService.create(createUserDto);
  }
}
