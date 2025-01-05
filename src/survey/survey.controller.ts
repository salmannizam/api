import { Controller, Post, Body } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { GetSurveyDto } from './dto/get-survey.dto';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post('validate-project')
  async validateProjectId(@Body() getSurveyDto: GetSurveyDto) {
    return await this.surveyService.validateProjectId(getSurveyDto);
  }
}
