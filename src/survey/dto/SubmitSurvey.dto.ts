// src/survey/dto/SubmitSurvey.dto.ts

import { IsArray, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { PreSurveyDetailsDto } from './PreSurveyDetails.dto';
import { AnsweredQuestionDto } from './AnsweredQuestion.dto';

export class SubmitSurveyDto {
  @ValidateNested()
  @IsObject()
  PreSurveyDetails: PreSurveyDetailsDto;

  @IsString()
  projectId: string;

  @IsArray()
  @ValidateNested({ each: true })
  answeredQuestions: AnsweredQuestionDto[];

  @IsOptional()  // Optional, but if you are sending images, this field must be present.
  @IsObject()
  images: Record<string, any>;  // This is for key-value pairs (questionId -> file)
}
