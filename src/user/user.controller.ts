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
import { CreateDto, UpdateDto, FilterDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Controller('user')
// Example implement global middleware auth & get auth
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  // Example implement specific middleware auth & get auth
  // @UseGuards(JwtGuard)
  async index(@Query() search: FilterDto, @Auth() user: User): Promise<User[]> {
    const check = await this.service.can(user, 'user-index');
    if (!check) {
      throw new ForbiddenException(`Permission denied !`);
    }

    return this.service.all(search);
  }

  @Post()
  async store(@Body() payload: CreateDto, @Auth() user: User): Promise<User> {
    const check = await this.service.can(user, 'user-create');
    if (!check) {
      throw new ForbiddenException(`Permission denied !`);
    }

    return this.service.create(payload);
  }

  @Get('/:id')
  async show(
    @Param('id', UUIDValidationPipe) id: string,
    @Auth() user: User,
  ): Promise<User> {
    const check = await this.service.can(user, 'user-show');
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
  ): Promise<void> {
    const check = await this.service.can(user, 'user-edit');
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
    const check = await this.service.can(user, 'user-delete');
    if (!check) {
      throw new ForbiddenException(`Permission denied !`);
    }

    return this.service.delete(id);
  }
}
