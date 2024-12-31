// src/app.module.ts

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SurveyModule } from './survey/survey.module';

@Module({
  imports: [AuthModule, UserModule, SurveyModule],
})
export class AppModule {}
