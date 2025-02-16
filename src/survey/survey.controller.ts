import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { ValidateSurveyDto } from './dto/vaildate-survey.dto';
import { SubmitSurveyDto } from './dto/SubmitSurvey.dto';
import { GetResultIdDto } from './dto/getResultId.dto';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) { }

  @Post('validate-project')
  async validateProjectId(@Body() validateSurveyDto: ValidateSurveyDto) {
    return await this.surveyService.validateProjectId(validateSurveyDto);
  }

  @Post('get-resultid')
  async getResultId(@Body() getResultIdDto: GetResultIdDto) {
    return await this.surveyService.getResultId(getResultIdDto);
  }

  @Get('get-questions/:surveyId')
  async getQuestionList(@Param('surveyId') surveyId: string) {
    return await this.surveyService.getQuestionList(surveyId);
  }

  @Get('get-submitted-project/:projectId/:outletname')
  async getSubmittedSurvey(@Param('projectId') projectId: string, @Param('outletname') outletname: string) {
    return await this.surveyService.getSubmittedSurvey(projectId, outletname);
  }

  
  @Post('submit-survey')
  async submitSurvey(@Body() submitSurveyDto: SubmitSurveyDto) {
    return await this.surveyService.submitSurvey(submitSurveyDto);
  }
}
