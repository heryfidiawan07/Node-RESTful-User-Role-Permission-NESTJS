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
import { Role } from 'src/role/entity/role.entity';
import { CreateDto, UpdateDto, FilterDto } from 'src/role/dto/role.dto';
import { RoleService } from 'src/role/role.service';
import { UserService } from 'src/user/user.service';

@Controller('role')
@UseGuards(JwtGuard)
export class RoleController {
  constructor(
    private readonly service: RoleService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async index(@Query() search: FilterDto, @Auth() user: User): Promise<Role[]> {
    const check = await this.userService.can(user, 'role-index');
    if (!check) {
      throw new ForbiddenException(`Permission denied !`);
    }

    return this.service.all(search);
  }

  @Post()
  async store(@Body() payload: CreateDto, @Auth() user: User): Promise<Role> {
    const check = await this.userService.can(user, 'role-create');
    if (!check) {
      throw new ForbiddenException(`Permission denied !`);
    }

    return this.service.create(payload);
  }

  @Get('/:id')
  async show(
    @Param('id', UUIDValidationPipe) id: string,
    @Auth() user: User,
  ): Promise<Role> {
    const check = await this.userService.can(user, 'role-show');
    if (!check) {
      throw new ForbiddenException(`Permission denied !`);
    }

    return this.service.find(id);
  }

  @Put('/:id')
  async update(
    @Param('id', UUIDValidationPipe) id: string,
    @Body() payload: UpdateDto,
    @Auth() user: User,
  ): Promise<Role> {
    const check = await this.userService.can(user, 'role-edit');
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
    const check = await this.userService.can(user, 'role-delete');
    if (!check) {
      throw new ForbiddenException(`Permission denied !`);
    }

    return this.service.delete(id);
  }
}
