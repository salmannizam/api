import { IsString, IsArray, IsObject, IsOptional, IsNumberString } from 'class-validator';

class AnsweredQuestionDto {
  @IsString()
  surveyid: string;

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

  @IsString()
  QuestionID: string;
}

class PreSurveyDetailsDto {
  @IsString()
  SurveyID: string;

  @IsString()
  ResultID: string;

  @IsString()
  OutletName: string;

  @IsString()
  State: string;

  @IsString()
  country: string;

  @IsString()
  Location: string;

  @IsString()
  Address: string;

  @IsString()
  Zone: string;

  @IsNumberString()
  StartDate: string;

  @IsNumberString()
  StartTime: string;

  @IsNumberString()
  EndDate: string;
  
  @IsNumberString()
  EndTime: string;

  @IsString()
  ProjectId: string;
}

export class SubmitSurveyDto {
  @IsString()
  ProjectId: string;

  @IsObject()
  PreSurveyDetails: PreSurveyDetailsDto;

  @IsArray()
  answeredQuestions: AnsweredQuestionDto[];

  @IsObject()
  @IsOptional() // Optional since there may be no images
  images: { [key: string]: string }; // Key: QuestionID, Value: Base64 Image String
}
