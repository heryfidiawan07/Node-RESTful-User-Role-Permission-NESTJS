import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/guard/jwt.guard';
import { AuthService } from 'src/auth/auth.service';
import {
  RegisterDto,
  LoginDto,
  RefreshAccessTokenDto,
} from 'src/auth/dto/auth.dto';
import {
  UserResponse,
  LoginResponse,
} from './interface/auth-response.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register')
  async register(@Body() payload: RegisterDto): Promise<UserResponse> {
    return this.service.register(payload);
  }

  @Post('login')
  async login(@Body() payload: LoginDto): Promise<LoginResponse> {
    return this.service.login(payload);
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() payload: RefreshAccessTokenDto,
  ): Promise<{ access_token: string }> {
    return this.service.refreshAccessToken(payload);
  }

  @Patch('/:id/revoke')
  @UseGuards(JwtGuard)
  async revokeRefreshToken(@Param('id') id: string): Promise<void> {
    return this.service.revokeRefreshToken(id);
  }
}
