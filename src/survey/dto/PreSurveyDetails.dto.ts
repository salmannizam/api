// src/survey/dto/PreSurveyDetails.dto.ts

import { IsString, IsDateString, IsOptional } from 'class-validator';

export class PreSurveyDetailsDto {
  @IsString()
  SurveyID: string;

  @IsString()
  ResultID: string;

  @IsString()
  OutletName: string;

  @IsString()
  State: string;

  @IsString()
  Location: string;

  @IsString()
  Address: string;

  @IsString()
  Zone: string;

  @IsDateString()
  StartDate: string;

  @IsDateString()
  EndDate: string;

  @IsDateString()
  StartTime: string;

  @IsDateString()
  EndTime: string;

  @IsString()
  ProjectId: string;
}
