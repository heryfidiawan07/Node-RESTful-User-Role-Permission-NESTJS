import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDto {
  @IsOptional()
  parent_menu: string;

  @IsOptional()
  parent_id: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  alias: string;

  @IsOptional()
  url: string;

  @IsOptional()
  icon: string;
}

export class UpdateDto {
  @IsOptional()
  parent_menu: string;

  @IsOptional()
  parent_id: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  alias: string;

  @IsOptional()
  url: string;

  @IsOptional()
  icon: string;
}

export class FilterDto {
  @IsOptional()
  parent_menu: string;

  @IsOptional()
  name: string;

  @IsOptional()
  alias: string;
}
