import { IsString,IsNotEmpty } from 'class-validator';  // Add validation decorators

export class ValidateSurveyDto {
  @IsString()
  @IsNotEmpty()
  surveyId: string;

  @IsString()
  @IsNotEmpty()
  projectId: string;
}
