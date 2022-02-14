import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class UpdateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class FilterDto {
  @IsOptional()
  name: string;

  @IsOptional()
  email: string;
}
