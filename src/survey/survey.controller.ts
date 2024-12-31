// src/survey/survey.controller.ts
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from '../common/dto/create-survey.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)  // Protect the route using JWT authentication
  async create(@Body() createSurveyDto: CreateSurveyDto) {
    return this.surveyService.create(createSurveyDto);
  }
}
