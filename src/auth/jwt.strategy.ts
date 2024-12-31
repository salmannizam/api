// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';  // Ensure that this is correctly imported

@Injectable()
export class JwtStrategy extends Strategy {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // Extracts token from the Authorization header
      secretOrKey: 'yourSecretKey',  // Use an environment variable here in production
    }, async (payload, done) => {  // The verify callback
      try {
        // Find the user by the username in the payload
        const user = await this.userService.findByUsername(payload.username);

        if (!user) {
          return done(new Error('User not found'), false); // If user is not found, reject the request
        }

        // Return user if found
        return done(null, user); 
      } catch (error) {
        return done(error, false);  // Handle any error during verification
      }
    });
  }
}
