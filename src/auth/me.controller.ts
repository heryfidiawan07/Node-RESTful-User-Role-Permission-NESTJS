import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/guard/jwt.guard';
import { Auth } from 'src/auth/get-user.decorator';
import { User } from 'src/user/entity/user.entity';
import { UserService } from '../user/user.service';

@Controller('me')
@UseGuards(JwtGuard)
export class MeController {
  constructor(private readonly service: UserService) {}

  @Get('/')
  async show(@Auth() user: User): Promise<User> {
    return this.service.find(user.id);
  }
}
