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

  async getSubmittedSurvey2(projectId: string, outletname: string) {
    // Define the SQL query to call the stored procedure
    const sqlQuery = 'EXEC [GetSurveyByOutletName] @ProjectId, @OutletName';

    try {
      // Pass parameters to the stored procedure
      const res = await this.databaseService.query(sqlQuery, [
        { name: 'ProjectId', type: sql.NVarChar(255), value: projectId },  // ProjectId passed to procedure
        { name: 'OutletName', type: sql.NVarChar(255), value: outletname }, // OutletName passed to procedure
      ]);

      // Assuming the result is an array of survey IDs or empty
      if (res && res.length > 0) {
        // If survey IDs are found, return them
        return {
          status: 'success',
          message: 'Survey IDs found',
          data: res, // or res[0].surveyId if it's one surveyId
        };
      } else {
        // If no survey IDs are found, return an empty result
        return {
          status: 'fail',
          message: 'No survey submissions found for the provided Project ID and Outlet Name',
          data: [],
        };
      }
    } catch (err) {
      // Handle errors during query execution
      console.error('Error executing query:', err);
      throw new BadRequestException('Unable to get submitted survey');
    }
  }

  async getSubmittedSurvey(projectId: string, outletname: string) {
    // Define the SQL query to call the stored procedure
    const sqlQuery = 'EXEC [dbo].[GetSurveyByOutletName] @ProjectId, @OutletName';

    try {
      // Pass parameters to the stored procedure
      const result = await this.databaseService.query(sqlQuery, [
        { name: 'ProjectId', type: sql.NVarChar(255), value: projectId },  // ProjectId passed to procedure
        { name: 'OutletName', type: sql.NVarChar(255), value: outletname }, // OutletName passed to procedure
      ]);

      // If there are rows (survey results), return them
      if (result && result.length > 0) {
        return {
          status: 'success',
          message: 'Survey data found',
          data: result, // This will contain the survey data retrieved
        };
      } else {
        // If no data found, return empty array with a fail status
        return {
          status: 'success',
          message: 'No survey data found for the provided Project ID and Outlet Name',
          data: [], // Empty array indicating no results
        };
      }
    } catch (err) {
      // Handle errors during query execution
      console.error('Error executing query:', err);
      throw new BadRequestException('Unable to get submitted survey');
    }
  }

  async submitSurvey(submitSurveyDto: SubmitSurveyDto) {

    try {
      const { ProjectId, PreSurveyDetails, answeredQuestions, images } = submitSurveyDto;

      // console.log('Survey Data:', PreSurveyDetails);
      // console.log('Survey Data:', answeredQuestions);

      const surveyGivenOfOutlet = await this.getSubmittedSurvey(ProjectId, PreSurveyDetails.Outlet_Name);
      if (surveyGivenOfOutlet.data.length > 0) {
    
        const productQuestion = answeredQuestions.find(
          (question) => question.QuestionID == "10033164"
        );
       
        // Ensure that the productQuestion is found and has an answertext
        if (productQuestion && productQuestion.AnswerText) {
          const productname = productQuestion.AnswerText;
         
          // Check if the product survey already exists in the given outlet's surveys
          const surveyExist = await this.checkProductSurveyGiven(surveyGivenOfOutlet.data, productname);

          if (surveyExist) {
            throw new BadRequestException('Survey of this product under this oultet name already exist')
          }
        }
      }

      // Serialize PreSurveyDetails and answeredQuestions to JSON
      const preSurveyDetailsJson = JSON.stringify({ OutletMasterImport: PreSurveyDetails });
      const answeredQuestionsJson = JSON.stringify({ SurveyResultsImport: answeredQuestions });

      // Check if the answer to QuestionID 10033172 is 'no'
      const isQuestion10033172Yes = answeredQuestions.some(
        (question) => question.QuestionID == "10033172" && question.AnswerText.toLowerCase() === 'yes'
      );
      console.log(isQuestion10033172Yes)

      // Process the Base64 images (optional, depending on your needs)
      // Process the Base64 images (optional, depending on your needs)
      if (images && isQuestion10033172Yes) {
        // Construct the path to store images based on ProjectId and Outlet Name
        const outletName = PreSurveyDetails['Outlet Name'] || 'defaultOutlet'; // Fallback if Outlet Name is not available
        const uploadDir = path.join('./uploads', ProjectId.toString(), outletName);

        // Create the directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Save images
        Object.keys(images).forEach((questionId) => {
          const base64Image = images[questionId];
          const buffer = Buffer.from(base64Image, 'base64');
          const filePath = path.join(uploadDir, `image_${questionId}.jpg`);

          // Write image to the file system
          fs.writeFileSync(filePath, buffer);
          console.log(`Saved image for Question ${questionId} at ${filePath}`);
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


  private checkProductSurveyGiven(surveys: any[], productName: string): boolean {
    console.log("surveys",surveys)
    console.log("productName",productName)
   
    // Check if any survey has the provided answerText (productName) for the specified QuestionID (10033167)
    const foundAnswer = surveys.some(survey =>
      survey.AnswerText == productName && survey.QuestionID == 10033164
    );
    console.log(foundAnswer)
    // Return true if foundAnswer is true, otherwise false
    return foundAnswer;
  }


}
