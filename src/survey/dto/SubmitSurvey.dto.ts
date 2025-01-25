// src/survey/dto/SubmitSurvey.dto.ts

import { IsArray, IsObject, IsString } from 'class-validator';
import { PreSurveyDetailsDto } from './PreSurveyDetails.dto';
import { AnsweredQuestionDto } from './AnsweredQuestion.dto';

export class SubmitSurveyDto {
  @IsObject()
  PreSurveyDetails: PreSurveyDetailsDto;

  @IsString()
  projectId: string;

  @IsArray()
  answeredQuestions: AnsweredQuestionDto[];

  @IsObject()
  images: Record<string, any>;  // Assuming images is an object with key-value pairs (questionId -> file)
}
