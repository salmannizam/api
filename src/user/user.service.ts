// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../common/dto/create-user.dto';

@Injectable()
export class UserService {

  // Your methods
  async create(createUserDto: CreateUserDto) {
    return true;
  }

  async findByUsername(username: string) {
    return true;
  }
}
