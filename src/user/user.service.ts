// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { knex } from '../config/knex.config';
import { CreateUserDto } from '../common/dto/create-user.dto';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    const { username, password, isAdmin } = createUserDto;
    const result = await knex('users')
      .insert({
        username,
        password,    // In production, ensure password is hashed
        is_admin: isAdmin,
      })
      .returning('*');
    return result[0];  // Return the inserted user
  }

  async findByUsername(username: string) {
    const user = await knex('users').where('username', username).first();
    return user;  // Will return null if no user is found
  }
}
