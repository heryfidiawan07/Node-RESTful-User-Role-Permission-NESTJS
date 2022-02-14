import { JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  secret: 'koderahasia',
  signOptions: {
    expiresIn: 14400,
    // expiresIn: 7200,
    // expiresIn: 60, // In second 60 = 1 minutes
  },
};

export const refreshTokenConfig: JwtSignOptions = {
  // expiresIn: 3600 * 24,
  expiresIn: 60 * 60, // In second 120 = 2 minutes
};

// example
// token expired in 1 minutes
// refresh token expired in 2 hours
// => if token expired client must be get token with refresh token
// => before client generate new token with refresh token refresh token must be to check if active bcause expired in 2 hours
