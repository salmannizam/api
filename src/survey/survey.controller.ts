import { Controller, Post, Body } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { ValidateSurveyDto } from './dto/vaildate-survey.dto';

import { SavePreSurveyDetailDto } from './dto/save-pre-survey.dto';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post('validate-project')
  async validateProjectId(@Body() validateSurveyDto: ValidateSurveyDto) {
    return await this.surveyService.validateProjectId(validateSurveyDto);
  }
  
  @Post('pre-survey-details')
  async savePreSurveyDetails(@Body() savPreSurveyDetailDto: SavePreSurveyDetailDto) {
    return await this.surveyService.savePreSurveyDetails(savPreSurveyDetailDto);
  }

}
