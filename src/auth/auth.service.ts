import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { refreshTokenConfig } from 'src/config/jwt.config';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { RegisterDto, LoginDto, RefreshAccessTokenDto } from './dto/auth.dto';
import {
  UserResponse,
  LoginResponse,
} from './interface/auth-response.interface';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @InjectRepository(RefreshTokenRepository)
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async register(request: RegisterDto): Promise<UserResponse> {
    const { email } = request;

    const check = await this.userService.validateRegister(email);
    if (check) {
      throw new UnauthorizedException('Email has been registered !');
    }

    const user = await this.userService.create(request);
    delete user.password;

    return { user } as UserResponse;
  }

  async login(request: LoginDto): Promise<LoginResponse> {
    const { email, password } = request;

    const user = await this.userService.validateLogin(email, password);
    if (!user) {
      throw new UnauthorizedException('Wrong email or password');
    }

    const access_token = await this.createAccessToken(user);
    const refresh_token = await this.createRefreshToken(user);

    return { access_token, refresh_token } as LoginResponse;
  }

  async refreshAccessToken(
    request: RefreshAccessTokenDto,
  ): Promise<{ access_token: string }> {
    const { refresh_token } = request;
    const payload = await this.decodeToken(refresh_token);
    const refreshToken = await this.refreshTokenRepository.findOne(
      payload.jwt_id,
      { relations: ['user'] },
    );

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is not found');
    }

    if (refreshToken.isRevoked) {
      throw new UnauthorizedException('Refresh token has beed revoked');
    }

    const access_token = await this.createAccessToken(refreshToken.user);

    return { access_token };
  }

  async decodeToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException('Refresh token is expired');
      } else {
        throw new InternalServerErrorException('Failed to decode token');
      }
    }
  }

  async createAccessToken(user: User): Promise<string> {
    const payload = { jwt_id: user.id };
    const access_token = await this.jwtService.signAsync(payload);
    return access_token;
  }

  async createRefreshToken(user: User): Promise<string> {
    const refreshToken = await this.refreshTokenRepository.createRefreshToken(
      user,
      +refreshTokenConfig.expiresIn,
    );
    const payload = { jwt_id: refreshToken.id };
    const refresh_token = await this.jwtService.signAsync(
      payload,
      refreshTokenConfig,
    );
    return refresh_token;
  }

  async revokeRefreshToken(id: string): Promise<void> {
    const refreshToken = await this.refreshTokenRepository.findOne(id);
    if (!refreshToken) {
      throw new NotFoundException('Refresh token is not found');
    }
    refreshToken.isRevoked = true;
    await refreshToken.save();
  }
}
