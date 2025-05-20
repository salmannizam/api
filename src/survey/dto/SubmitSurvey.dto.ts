import { IsString, IsArray, IsObject, IsOptional, IsNumberString, IsNotEmpty, Length } from 'class-validator';
import { Expose } from 'class-transformer';

class AnsweredQuestionDto {
  @IsString()
  SurveyID: string;

  @IsString()
  ResultID: string;

  @IsString()
  AnswerID: string;

  @IsString()
  AnswerText: string;

  @IsString()
  Location: string;

  @IsString()
  Remarks: string;

  @IsString()
  DeviceID: string;

  @IsString()
  ProjectId: string;

  @IsString()
  QuestionID: string;
}

class PreSurveyDetailsDto {
  @IsString()
  SurveyID: string;

  @IsString()
  ResultID: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  Outlet_Name: string;

  @IsString()
  @IsNotEmpty()  // Make State mandatory
  State: string;

  // @IsString()
  // @IsNotEmpty()  // Make country mandatory
  // country: string;

  @IsString()
  @IsNotEmpty()  // Make Location mandatory
  Location: string;

  @IsString()
  @IsNotEmpty()  // Make Address mandatory
  Address: string;

  @IsString()
  @IsNotEmpty()  // Make Zone mandatory
  Zone: string;

  @IsNumberString()
  @IsNotEmpty()  // Make StartDate mandatory
  StartDate: string;

  @IsNumberString()
  @IsNotEmpty()  // Make StartTime mandatory
  StartTime: string;

  @IsNumberString()
  @IsNotEmpty()  // Make EndDate mandatory
  EndDate: string;

  @IsNumberString()
  @IsNotEmpty()  // Make EndTime mandatory
  EndTime: string;

  @IsString()
  @IsNotEmpty()  // Make ProjectId mandatory
  ProjectId: string;
}

export class SubmitSurveyDto {
  @IsString()
  @IsNotEmpty()  // Make ProjectId mandatory
  ProjectId: string;

  @IsObject()
  @IsNotEmpty()  // Make PreSurveyDetails mandatory
  PreSurveyDetails: PreSurveyDetailsDto;

  @IsArray()
  @IsNotEmpty()  // Make answeredQuestions mandatory
  answeredQuestions: AnsweredQuestionDto[];

  @IsObject()
  @IsOptional()
  images: { [key: string]: string[] }; // array of base64 strings
  
  @IsObject()
  @IsOptional()  // Make images optional
  allImagesDefectCount: { [key: string]: string }; // Key: QuestionID, Value: Base64 Image String

  @IsObject()
  @IsOptional()  // Make images optional
  allImagesRemarks: { [key: string]: string }; // Key: QuestionID, Value: Base64 Image String
}
