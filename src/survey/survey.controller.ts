import { Controller, Post, Body } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { ValidateSurveyDto } from './dto/vaildate-survey.dto';
import { SubmitSurveyDto } from './dto/submit-survey.dto';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post('validate-project')
  async validateProjectId(@Body() validateSurveyDto: ValidateSurveyDto) {
    return await this.surveyService.validateProjectId(validateSurveyDto);
  }
  

  @Post('submit-survey')
  async submitSurvey(@Body() submitSurveyDto: SubmitSurveyDto) {
    return await this.surveyService.submitSurvey(submitSurveyDto);
  }
}
