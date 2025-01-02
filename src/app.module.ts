// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; // Import the ConfigModule
// import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration globally available
    }),
    // AuthModule,
    UserModule,
    // TypeOrmModule.forRoot({
    //   type: 'mssql',
    //   host: process.env.DB_HOST, // Use the environment variables
    //   port: parseInt(process.env.DB_PORT), // Convert to integer
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_DATABASE,
    //   extra: {
    //     encrypt: false, // Disable encryption for local testing
    //     trustServerCertificate: true, // Trust self-signed certificates
    //   },
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'], // Automatically load entities
    //   synchronize: process.env.DB_SYNCHRONIZE === 'true', // Use environment variable for synchronization
    // }),
    AuthModule,
  ],
})
export class AppModule {}
