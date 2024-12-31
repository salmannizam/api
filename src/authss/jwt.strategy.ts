import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';  // Ensure that this is correctly imported
import { ConfigService } from '@nestjs/config'; // Import ConfigService
import { UnauthorizedException } from '@nestjs/common'; // To throw UnauthorizedException

@Injectable()
export class JwtStrategy extends Strategy {
  constructor(
    private userService: UserService,
    private configService: ConfigService, // Inject ConfigService
  ) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // Extracts token from the Authorization header
        secretOrKey: configService.get('JWT_SECRET') || 'defaultSecretKey',  // Use environment variable here
      },
      async (payload, done) => {  // The verify callback
        try {
          if (!payload) {
            throw new UnauthorizedException('JWT token is missing or invalid'); // Explicitly handle missing token
          }

          // Find the user by the username in the payload
          const user = await this.userService.findByUsername(payload.username);

          if (!user) {
            throw new UnauthorizedException('User not found'); // If user is not found, throw Unauthorized
          }

          // Return user if found
          return done(null, user);
        } catch (error) {
          return done(new UnauthorizedException(error.message), false);  // Handle any error during verification
        }
      }
    );
  }
}
