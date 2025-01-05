
import { Module } from '@nestjs/common';
import { SurveyModule } from './survey/survey.module';
import { DatabaseModule } from './database/database.module';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config'; // Import the ConfigModule
@Module({
  imports: [SurveyModule, 
    DatabaseModule,
    // ConfigModule.forRoot({
    //   isGlobal: true, // Make the configuration globally available
    // }),
    //     TypeOrmModule.forRoot({
    //   type: 'mssql',
    //   host: '40.127.190.1' ,// process.env.DB_HOST, // Use the environment variables
    //   // port: parseInt(process.env.DB_PORT), // Convert to integer
    //   username: 'survey', //process.env.DB_USERNAME,
    //   password: 'survey@123', // process.env.DB_PASSWORD,
    //   database: 'survey', // process.env.DB_DATABASE,
    //   extra: {
    //     encrypt: false, // Disable encryption for local testing
    //     trustServerCertificate: true, // Trust self-signed certificates
    //   },
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'], // Automatically load entities
    //   synchronize: process.env.DB_SYNCHRONIZE === 'true', // Use environment variable for synchronization
    // }),
   ],
})
export class AppModule { }


// host: '40.127.190.1',
// user: 'survey',
// password: 'survey@123',
// database: 'survey',