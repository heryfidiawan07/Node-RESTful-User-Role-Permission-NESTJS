import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { UserModule } from 'src/user/user.module';
import { AuthService } from 'src/auth/auth.service';
import { AuthController } from 'src/auth/auth.controller';
import { MeController } from 'src/auth/me.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenRepository } from 'src/auth/repository/refresh-token.repository';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    TypeOrmModule.forFeature([RefreshTokenRepository]),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController, MeController],
})
export class AuthModule {}
