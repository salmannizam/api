// src/config/knex.config.ts
import Knex from 'knex';

export const knex = Knex({
  client: 'mssql',
  connection: {
    host: 'localhost',    // Change to your server's IP if needed
    user: 'sa',           // Your SQL Server username
    password: 'your_password', // Your SQL Server password
    database: 'SurveyDB', // Your database name
    options: {
      encrypt: true, // Always use encryption if connecting to cloud or remote DB
      trustServerCertificate: true, // Disable certificate validation if using self-signed cert
    },
  },
});
