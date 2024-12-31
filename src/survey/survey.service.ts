import { knex } from './../config/knex.config';
// src/survey/survey.service.ts
import { Injectable } from '@nestjs/common';
import { CreateSurveyDto } from '../common/dto/create-survey.dto';

@Injectable()
export class SurveyService {
  // Create a new survey
  async create(createSurveyDto: CreateSurveyDto) {
    const { name, description, questions } = createSurveyDto;

    try {
      // Insert new survey into 'surveys' table
      const [survey] = await knex('surveys')
        .insert({ name, description, questions: JSON.stringify(questions) })
        .returning('*');  // Return the inserted survey

      return survey;  // Return the created survey object
    } catch (error) {
      throw new Error('Error creating survey: ' + error.message);
    }
  }
}
