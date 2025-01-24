import { IsString, IsNotEmpty, IsEnum } from 'class-validator';  // Import IsEnum decorator

// Define the enum for 'startZone'
export enum StartZone {
  NORTH = 'North',
  SOUTH = 'South',
  EAST = 'East',
  WEST = 'West',
  CENTRAL = 'Central',
}

export class SavePreSurveyDetailDto {
  @IsString()
  @IsNotEmpty()
  surveyId: string;

  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  outletName: string;

  @IsEnum(StartZone)
  startZone: StartZone;
}


export class SubmitSurveyDto {

}