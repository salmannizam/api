import { IsString,IsNotEmpty } from 'class-validator';  // Add validation decorators

export class GetResultIdDto {
  @IsString()
  @IsNotEmpty()
  surveyId: string;

  @IsString()
  @IsNotEmpty()
  ProjectId: string;

  @IsString()
  @IsNotEmpty()
  OutletName: string;
}
