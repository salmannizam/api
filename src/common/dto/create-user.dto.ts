// src/common/dto/create-user.dto.ts

import { IsString, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsBoolean()
  isAdmin: boolean;  // Mark as true for admin, false for regular users
}
