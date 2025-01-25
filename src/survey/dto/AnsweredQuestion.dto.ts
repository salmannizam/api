// src/survey/dto/AnsweredQuestion.dto.ts

import { IsString, IsNumber, IsOptional } from 'class-validator';

export class AnsweredQuestionDto {
  @IsString()
  SurveyID: string;

  @IsNumber()
  QuestionID: number;

  @IsString()
  answerid: string;

  @IsString()
  answertext: string;

  @IsString()
  Location: string;

  @IsOptional()  // If remarks is optional
  @IsString()
  remarks?: string;

  @IsOptional()  // If Deviceid is optional
  @IsString()
  Deviceid?: string;

  @IsString()
  projectid: string;
}
