import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ValidateSurveyDto } from './dto/vaildate-survey.dto';
import * as sql from 'mssql';  // Ensure 'mssql' is imported
import { SubmitSurveyDto } from './dto/SubmitSurvey.dto';

@Injectable()
export class SurveyService {
  constructor(private databaseService: DatabaseService) { }

  async validateProjectId(validateSurveyDto: ValidateSurveyDto) {
    // Correctly define the SQL query with parameterized values
    const sqlQuery = 'EXEC GetvalidateProjectId @ProjectId, @SurveyName';

    try {
      // Pass parameters explicitly in the correct order
      const res = await this.databaseService.query(sqlQuery, [
        { name: 'ProjectId', type: sql.NVarChar(100), value: validateSurveyDto.productId }, // Use productId from DTO
        { name: 'SurveyName', type: sql.NVarChar(100), value: validateSurveyDto.surveyId },  // Use surveyId from DTO
      ]);


      if (res.length > 0 && res[0].RESULT == "SUCCESS") {
        return {
          "status": "success",
          "message": "Project ID is valid",
        }
      } else if (res.length > 0 && res[0].RESULT == "FAIL") {
        return {
          "status": "fail",
          "message": "Invalid Project ID",
        }
      } else {
        return {
          "status": "fail",
          "message": "Error validating Project ID",
        }
      }

    } catch (error) {
      console.error('Error executing query:', error);
      throw error; // Re-throw the error to be caught by global error handlers
    }
  }


  async submitSurvey(submitSurveyDto: SubmitSurveyDto) {
    // Here, you can handle the business logic of saving the survey data, uploading the images, etc.
    // For example, you could save the data to the database and process images.

    const { PreSurveyDetails, answeredQuestions, images } = submitSurveyDto;

    console.log('PreSurveyDetails:', PreSurveyDetails);
    console.log('Answered Questions:', answeredQuestions);
    console.log('Images:', images);

    // Add your business logic here (save data to DB, upload images, etc.)

    return {
      success: true,
      message: 'Survey successfully submitted.',
    };
  }

}
