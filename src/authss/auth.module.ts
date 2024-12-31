import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';  // Import UserModule here
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule
import { PassportModule } from '@nestjs/passport'; // Make sure PassportModule is imported

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration globally available
    }),
    PassportModule,  // Ensure PassportModule is imported here
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecretKey', // Use environment variable for secret key
      signOptions: { expiresIn: '60m' },
    }),
    UserModule, // Now UserService will be available
  ],
  providers: [AuthService, JwtStrategy],  // Register JwtStrategy here
  controllers: [AuthController],
})
export class AuthModule {}
