import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

export class CompleteSurveyDto {
  @IsInt()
  @IsNotEmpty()
  surveyId: number;

  @IsArray()
  @IsNotEmpty()
  answers: any[];
}
