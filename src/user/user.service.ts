// src/user/user.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from '../common/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)  // Inject the User repository
    private userRepository: Repository<User>,
  ) {}

  // Your methods
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email: username } });  // Assuming username is email
  }
}
