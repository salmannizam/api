// src/survey/dto/AnsweredQuestion.dto.ts

import { IsString, IsNumber, IsOptional } from 'class-validator';

export class AnsweredQuestionDto {
  @IsNumber()
  QuestionID: number;

  @IsString()
  answerid: string;

  @IsString()
  answertext: string;

  @IsString()
  Location: string;

  @IsString()
  remarks: string;

  @IsString()
  Deviceid: string;

  @IsString()
  ProjectId: string;
}
