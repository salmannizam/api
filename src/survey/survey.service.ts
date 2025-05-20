import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ValidateSurveyDto } from './dto/vaildate-survey.dto';
import * as sql from 'mssql';  // Ensure 'mssql' is imported
import { SubmitSurveyDto } from './dto/SubmitSurvey.dto';
import { GetResultIdDto } from './dto/getResultId.dto';
import * as ftp from 'basic-ftp';
import * as sharp from 'sharp';
import { BlobServiceClient } from '@azure/storage-blob';



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

      console.log(res)


      if (res.length > 0 && res[0].RESULT == "SUCCESS" && res[0].SURVEYID) {
        return {
          "status": "success",
          "message": "Project ID is valid",
          data: { surveyId: res[0].SURVEYID }
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

  async getResultId(getResultIdDto: GetResultIdDto) {
    // Correctly define the SQL query with parameterized values
    const sqlQuery = 'EXEC GetvalidateOutletName @ProjectId, @SurveyName, @OutletName';
    console.log("hitted");

    try {
      // Pass parameters explicitly in the correct order
      const res = await this.databaseService.query(sqlQuery, [
        { name: 'ProjectId', type: sql.NVarChar(100), value: getResultIdDto.ProjectId },  // Use ProjectId from DTO
        { name: 'SurveyName', type: sql.NVarChar(100), value: getResultIdDto.surveyId },  // Use SurveyName from DTO
        { name: 'OutletName', type: sql.NVarChar(100), value: getResultIdDto.OutletName }, // Use OutletName from DTO
      ]);

      // console.log(res);

      if (res.length > 0 && res[0].RESULT === "SUCCESS") {
        return {
          status: "success",
          message: "Result ID found",
          data: { resultId: res[0].RESULTID }
        };
      } else if (res.length > 0 && res[0].RESULT === "FAIL") {
        return {
          status: "fail",
          message: "Invalid Project ID or Outlet Name",
        };
      } else {
        return {
          status: "fail",
          message: "Error validating Project ID or Outlet Name",
        };
      }

    } catch (error) {
      console.error('Error executing query:', error);
      throw error; // Re-throw the error to be caught by global error handlers
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


  async getQuestionList(surveyId: string) {
    // Define the SQL query to call the stored procedure
    const sqlQuery = 'EXEC [dbo].[GetSurveyQuestionMastercvdsJSON] @SurveyId';

    try {
      // Pass parameters to the stored procedure
      const result = await this.databaseService.query(sqlQuery, [
        { name: 'SurveyId', type: sql.NVarChar(255), value: surveyId },  // surveyId passed to procedure
      ]);

      // console.log(result)

      // Check if the result contains data
      if (result && result.length > 0) {
        // Parse the resultname field (it's a JSON string) into an actual object
        const parsedData = JSON.parse(result[0].resultname);
        // console.log(JSON.stringify(parsedData))
        // Check if parsedData contains Questions
        if (parsedData && parsedData[0] && parsedData[0].Questions && parsedData[0].Questions.length > 0) {
          return {
            status: 'success',
            message: 'Survey questions data found',
            data: parsedData[0].Questions, // This will contain the survey data
          };
        } else {
          return {
            status: 'success',
            message: 'No questions found for this survey',
            data: [], // Empty array if no questions
          };
        }
      } else {
        return {
          status: 'success',
          message: 'No survey data found',
          data: [], // Empty array if no result
        };
      }

    } catch (err) {
      // Handle errors during query execution
      console.error('Error executing query:', err);
      throw new BadRequestException('Unable to get Survey questions');
    }
  }


  async submitSurvey(submitSurveyDto: SubmitSurveyDto) {

    try {
      const { ProjectId, PreSurveyDetails, answeredQuestions, images, allImagesDefectCount, allImagesRemarks } = submitSurveyDto;

      console.log('allImagesDefectCount:', allImagesDefectCount);
      console.log('allImagesRemarks:', allImagesRemarks);

      const surveyGivenOfOutlet = await this.getSubmittedSurvey(ProjectId, PreSurveyDetails.Outlet_Name);
      if (surveyGivenOfOutlet.data.length > 0) {

        const productQuestion = answeredQuestions.find(
          (question) => question.QuestionID == "10000049"
        );

        // Ensure that the productQuestion is found and has an answertext
        if (productQuestion && productQuestion.AnswerText) {
          // Check if the product survey already exists in the given outlet's surveys
          const surveyExist = await this.checkProductSurveyGiven(surveyGivenOfOutlet.data, productQuestion.AnswerText);
          if (surveyExist) {
            throw new BadRequestException('Survey of this product under this oultet name already exist')
          }
        }
      }

      // Serialize PreSurveyDetails and answeredQuestions to JSON
      const preSurveyDetailsJson = JSON.stringify({ OutletMasterImport: PreSurveyDetails });

      // Check if the answer to QuestionID 10000057 is 'no'
      const isQuestion10000057Yes = answeredQuestions.some(
        (question) => question.QuestionID == "10000057" && question.AnswerText.toLowerCase() === 'yes'
      );
      console.log(isQuestion10000057Yes)

      // Process the Base64 images (optional, depending on your needs)

      if (images && isQuestion10000057Yes) {
        const outletName = PreSurveyDetails['Outlet Name'] || 'defaultOutlet';
        const uploadedFiles = await this.uploadImageToAzure(ProjectId, outletName, images);

        // Save images
        // Update answer texts with the uploaded file names
        // Object.entries(uploadedFiles).forEach(([questionId, fileName]) => {
        //   const questionToUpdate = answeredQuestions.find(q => q.QuestionID === questionId);
        //   if (questionToUpdate) {
        //     questionToUpdate.AnswerText = fileName;  // Save only the file name
        //   }
        // });

        Object.entries(uploadedFiles).forEach(([questionId, fileName]) => {
          const existing = answeredQuestions.find(q => q.QuestionID === questionId);

          if (existing) {
            existing.AnswerText = fileName;
          } else {
            answeredQuestions.push({
              SurveyID: PreSurveyDetails.SurveyID,
              ResultID: PreSurveyDetails.ResultID,
              QuestionID: questionId,
              AnswerID: "" ,
              AnswerText: fileName,
              Location: allImagesDefectCount?.[questionId] ?? "1" ,
              Remarks: allImagesRemarks?.[questionId] ?? '',
              DeviceID: answeredQuestions?.[0]?.DeviceID,
              ProjectId: PreSurveyDetails.ProjectId
            });
          }
        });

      }

      const answeredQuestionsJson = JSON.stringify({ SurveyResultsImport: answeredQuestions });

      // Prepare the parameters to pass to the stored procedure
      const sqlQuery = 'EXEC [dbo].[OutletImportJSONSAVE] @JSON_INPUT, @JSON_INPUT1';

      // console.log('preSurveyDetailsJson',preSurveyDetailsJson);
      console.log('answeredQuestionsJson',answeredQuestionsJson);
      // Execute the query using the database service, passing the parameters
      const res = await this.databaseService.query(sqlQuery, [
        { name: 'JSON_INPUT', type: 'nvarchar(max)', value: preSurveyDetailsJson },
        { name: 'JSON_INPUT1', type: 'nvarchar(max)', value: answeredQuestionsJson }
      ]);
      // You can add more logic here, e.g., save the data to a database, send a response, etc.

      // console.log("res",res)
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

      console.error('Error submitting survey:', err.message);
      // throw new BadRequestException(err.message)

      throw err;
    }

  }


  private checkProductSurveyGiven(surveys: any[], productName: string): boolean {
    // console.log("surveys", surveys)
    // console.log("productName", productName)

    // Check if any survey has the provided answerText (productName) for the specified QuestionID (10033167)
    const foundAnswer = surveys.some(survey =>
      survey.AnswerText == productName && survey.QuestionID == 10000049
    );
    console.log(foundAnswer)
    // Return true if foundAnswer is true, otherwise false
    return foundAnswer;
  }


  private async uploadImageToAzure2(projectId: string, outletName: string, images: Record<string, string>) {

    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_BUCKET_KEY);
    const containerClient = blobServiceClient.getContainerClient('survey'); // Use your container name

    const uploadedFiles: Record<string, string> = {};  // To store uploaded file names

    try {
      // Upload each image
      for (const [questionId, base64Image] of Object.entries(images)) {
        const buffer = Buffer.from(base64Image, 'base64');

        // Generate a unique file name
        const randomNumber = Math.floor(100000 + Math.random() * 900000);

        const timestamp = Date.now();
        const fileName = `${timestamp}_${randomNumber}.jpg`;
        const filePath = `${projectId}/${fileName}`; // Path inside the Azure container

        const blockBlobClient = containerClient.getBlockBlobClient(filePath);
        await blockBlobClient.uploadData(buffer);

        console.log(`Uploaded image for Question ${questionId} to Azure at ${filePath}`);

        // Save only the file name
        uploadedFiles[questionId] = fileName;
      }
    } catch (err) {
      console.error('Azure Upload Error:', err.message);
      throw new BadRequestException('Failed to upload images to Azure Storage');
    }

    return uploadedFiles;  // Return only file names
  }

  private async uploadImageToAzure(projectId: string, 
    outletName: string,
    images: Record<string, string[]>
    ) {
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_BUCKET_KEY);
    const containerClient = blobServiceClient.getContainerClient('survey');

    const uploadedFiles: Record<string, string> = {};

    try {
      for (const [questionId, base64ImageArray] of Object.entries(images)) {
        const fileNames: string[] = [];
  
        for (const base64Image of base64ImageArray) {
          const buffer = Buffer.from(base64Image, 'base64');
  
          // Compress
          const compressedBuffer = await sharp(buffer)
            .resize({ width: 1024, fit: 'inside' })
            .jpeg({ quality: 70 })
            .toBuffer();
  
          // Unique filename
          const randomNumber = Math.floor(100000 + Math.random() * 900000);
          const timestamp = Date.now();
          const fileName = `${timestamp}_${randomNumber}.jpg`;
          const filePath = `${projectId}/${fileName}`;
  
          const blockBlobClient = containerClient.getBlockBlobClient(filePath);
          await blockBlobClient.uploadData(compressedBuffer);
  
          fileNames.push(fileName);
        }
  
        uploadedFiles[questionId] = fileNames.join(','); // store as comma-separated string
      }
    } catch (err) {
      console.error('Azure Upload Error:', err.message);
      throw new BadRequestException('Failed to upload images to Azure Storage');
    }
  
    return uploadedFiles;
  }


}
