import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { ValidateSurveyDto } from './dto/vaildate-survey.dto';
import { SubmitSurveyDto } from './dto/SubmitSurvey.dto';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post('validate-project')
  async validateProjectId(@Body() validateSurveyDto: ValidateSurveyDto) {
    return await this.surveyService.validateProjectId(validateSurveyDto);
  }
  
  @Get('get-submitted-project/:surveyId')
  async getSubmittedSurvey(@Param('surveyId') surveyId: string) {
    return await this.surveyService.getSubmittedSurvey(surveyId);
  }

  @Post('submit-survey')
  async submitSurvey(@Body() submitSurveyDto: SubmitSurveyDto) {
    return await this.surveyService.submitSurvey(submitSurveyDto);
  }
}
