import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ValidateSurveyDto } from './dto/vaildate-survey.dto';
import { SavePreSurveyDetailDto } from './dto/save-pre-survey.dto';
import * as sql from 'mssql';  // Ensure 'mssql' is imported

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
      

      if (res.length > 0  && res[0].RESULT == "SUCCESS") {
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

  async savePreSurveyDetails(savPreSurveyDetailDto: SavePreSurveyDetailDto) {

    return {
      "status": "success",
      "message": "Project ID is valid",
    }
    const sqlQuery = 'EXEC GetvalidateProjectId @ProjectId, @SurveyName';
    try {
      // Pass parameters explicitly in the correct order
      const res = await this.databaseService.query(sqlQuery, [
        { name: 'ProjectId', type: sql.NVarChar(100), value: savPreSurveyDetailDto.productId }, 
        { name: 'SurveyName', type: sql.NVarChar(100), value: savPreSurveyDetailDto.surveyId }, 
        { name: 'address', type: sql.NVarChar(100), value: savPreSurveyDetailDto.address },  
        { name: 'country', type: sql.NVarChar(100), value: savPreSurveyDetailDto.country },  
        { name: 'location', type: sql.NVarChar(100), value: savPreSurveyDetailDto.location }, 
        { name: 'outletName', type: sql.NVarChar(100), value: savPreSurveyDetailDto.outletName }, 
        { name: 'startZone', type: sql.NVarChar(100), value: savPreSurveyDetailDto.startZone },  
      ]);
      

      if (res.length > 0  && res[0].RESULT == "SUCCESS") {
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



}
