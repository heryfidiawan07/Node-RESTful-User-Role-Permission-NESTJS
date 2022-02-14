import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDto, UpdateDto, FilterDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entity/user.entity';
import { UserRepository } from 'src/user/repository/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly repository: UserRepository,
  ) {}

  // Example get auth user from user.controller
  // async all(user: User, filter: FilterDto): Promise<User[]> {
  async all(filter: FilterDto): Promise<User[]> {
    // Example send param auth user to user.repository
    // return await this.repository.filter(user, filter);
    return await this.repository.filter(filter);
  }

  async create(request: CreateDto): Promise<User> {
    const { name, email } = request;
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(request.password, salt);

    try {
      return await this.repository.save({ name, email, salt, password });
    } catch (e) {
      if (e.code == '23505') {
        throw new ConflictException(`Email ${email} already used !`);
      } else {
        throw new InternalServerErrorException(e);
      }
    }
  }

  async find(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    if (!user) {
      throw new NotFoundException(`Data not found !`);
    }
    return user;
  }

  async update(id: string, request: UpdateDto): Promise<void> {
    const { name, email } = request;
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(request.password, salt);
    try {
      await this.repository.update(id, { name, email, salt, password });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async delete(id: string): Promise<void> {
    const result = await this.repository.delete({ id });
    if (result.affected == 0) {
      throw new NotFoundException(`Data not found !`);
    }
  }

  async can(user: User, action: string): Promise<boolean> {
    if (action == 'except') {
      return true;
    }

    const result = user.role.permissions.filter((permission) => {
      return permission.name == action;
    });

    if (result.length > 0) {
      return true;
    }
    return false;
  }

  // Function for validate user login & register
  // implement on src/auth/auth.service
  async validateRegister(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    if (user) {
      return user;
    }
    return null;
  }

  async validateLogin(email: string, password: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    if (user && (await user.validatePassword(password))) {
      return user;
    }
    return null;
  }
}
