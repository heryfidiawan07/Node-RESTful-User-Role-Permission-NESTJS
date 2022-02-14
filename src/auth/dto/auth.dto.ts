import { IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class LoginDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class RefreshAccessTokenDto {
  @IsNotEmpty()
  refresh_token: string;
}
