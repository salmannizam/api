import { IsString } from 'class-validator';  // Add validation decorators

export class GetSurveyDto {
  @IsString()
  surveyId: string;

  @IsString()
  productId: string;
}
