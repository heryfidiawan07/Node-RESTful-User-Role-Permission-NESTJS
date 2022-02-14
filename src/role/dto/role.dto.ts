import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  permissions: [];
}

export class UpdateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  permissions: [];
}

export class FilterDto {
  @IsOptional()
  name: string;
}
