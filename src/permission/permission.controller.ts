import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/guard/jwt.guard';
import { UUIDValidationPipe } from 'src/pipes/uuid-validation.pipe';
import { Auth } from 'src/auth/get-user.decorator';
import { User } from 'src/user/entity/user.entity';
import { Permission } from 'src/permission/entity/permission.entity';
import {
  CreateDto,
  UpdateDto,
  FilterDto,
} from 'src/permission/dto/permission.dto';
import { PermissionService } from 'src/permission/permission.service';
import { UserService } from 'src/user/user.service';

@Controller('permission')
@UseGuards(JwtGuard)
export class PermissionController {
  constructor(
    private readonly service: PermissionService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async index(
    @Query() filter: FilterDto,
    @Auth() user: User,
  ): Promise<Permission[]> {
    const check = await this.userService.can(user, 'except');
    if (!check) {
      throw new ForbiddenException(`Permission denied !`);
    }

    return this.service.all(filter);
  }

  @Get('/:id')
  async show(
    @Param('id', UUIDValidationPipe) id: string,
    @Auth() user: User,
  ): Promise<Permission> {
    const check = await this.userService.can(user, 'except');
    if (!check) {
      throw new ForbiddenException(`Permission denied !`);
    }

    return await this.service.find(id);
  }

  @Post()
  async store(
    @Body() payload: CreateDto,
    @Auth() user: User,
  ): Promise<Permission> {
    const check = await this.userService.can(user, 'except');
    if (!check) {
      throw new ForbiddenException(`Permission denied !`);
    }

    return this.service.create(payload);
  }

  @Put('/:id')
  async update(
    @Param('id', UUIDValidationPipe) id: string,
    @Body() payload: UpdateDto,
    @Auth() user: User,
  ): Promise<Permission> {
    const check = await this.userService.can(user, 'except');
    if (!check) {
      throw new ForbiddenException(`Permission denied !`);
    }

    return this.service.update(id, payload);
  }

  @Delete('/:id')
  async destroy(
    @Param('id', UUIDValidationPipe) id: string,
    @Auth() user: User,
  ): Promise<void> {
    const check = await this.userService.can(user, 'except');
    if (!check) {
      throw new ForbiddenException(`Permission denied !`);
    }

    return this.service.delete(id);
  }
}
