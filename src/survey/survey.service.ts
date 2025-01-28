import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ValidateSurveyDto } from './dto/vaildate-survey.dto';
import * as sql from 'mssql';  // Ensure 'mssql' is imported
import { SubmitSurveyDto } from './dto/SubmitSurvey.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SurveyService {
  constructor(private databaseService: DatabaseService) { }

  async validateProjectId(validateSurveyDto: ValidateSurveyDto) {
    // Correctly define the SQL query with parameterized values
    const sqlQuery = 'EXEC GetvalidateProjectId @ProjectId, @SurveyName';
    console.log("hitted")

    try {
      // Pass parameters explicitly in the correct order
      const res = await this.databaseService.query(sqlQuery, [
        { name: 'ProjectId', type: sql.NVarChar(100), value: validateSurveyDto.ProjectId }, // Use projectId from DTO
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

  async getSubmittedSurvey(surveyId: string) {
    try {


    } catch (err) {
      throw new BadRequestException("Unable to get submitted survey")
    }

  }

  async submitSurvey(submitSurveyDto: SubmitSurveyDto) {

    try {
      const { ProjectId, PreSurveyDetails, answeredQuestions, images } = submitSurveyDto;

      console.log('Survey Data:', PreSurveyDetails);
      console.log('Survey Data:', answeredQuestions);

      // Serialize PreSurveyDetails and answeredQuestions to JSON
      const preSurveyDetailsJson = JSON.stringify(PreSurveyDetails);
      const answeredQuestionsJson = JSON.stringify(answeredQuestions);

      // Check if the answer to QuestionID 10033172 is 'no'
      const isQuestion10033172Yes = answeredQuestions.some(
        (question) => question.QuestionID === "10033172" && question.AnswerText.toLowerCase() === 'yes'
      );

      // Process the Base64 images (optional, depending on your needs)
      if (images && isQuestion10033172Yes) {
        const uploadDir = './uploads';
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir);
        }

        Object.keys(images).forEach((questionId) => {
          const base64Image = images[questionId];
          const buffer = Buffer.from(base64Image, 'base64');
          const filePath = path.join(uploadDir, `image_${questionId}.jpg`);
          fs.writeFileSync(filePath, buffer);
          console.log(`Saved image for Question ${questionId} as ${filePath}`);
        });
      }

      // Prepare the parameters to pass to the stored procedure
      const sqlQuery = 'EXEC [dbo].[OutletImportJSONSAVE] @JSON_INPUT, @JSON_INPUT1';

      // Execute the query using the database service, passing the parameters
      const res = await this.databaseService.query(sqlQuery, [
        { name: 'JSON_INPUT', type: 'nvarchar(max)', value: preSurveyDetailsJson },
        { name: 'JSON_INPUT1', type: 'nvarchar(max)', value: answeredQuestionsJson }
      ]);
      // You can add more logic here, e.g., save the data to a database, send a response, etc.

      // Handle response from the stored procedure
      if (res && res.length > 0 && res[0].RESULT === "SUCCESS") {
        return {
          status: 'success',
          message: 'Survey submitted successfully',
        };
      } else {
        return {
          status: 'fail',
          message: 'Error while saving the survey data',
        };
      }
    } catch (err) {

      console.error('Error submitting survey:', err);
      throw err;
    }

  }

}
