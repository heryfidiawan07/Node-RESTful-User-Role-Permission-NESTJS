import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDto, UpdateDto, FilterDto } from './dto/role.dto';
import { Role } from 'src/role/entity/role.entity';
import { RoleRepository } from 'src/role/repository/role.repository';
import { PermissionRepository } from 'src/permission/repository/permission.repository';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly repository: RoleRepository,
    @InjectRepository(PermissionRepository)
    private readonly permission: PermissionRepository,
  ) {}

  async all(search: FilterDto): Promise<Role[]> {
    return await this.repository.filter(search);
  }

  async create(request: CreateDto): Promise<Role> {
    try {
      const role = await this.repository.create(request);
      role.permissions = [];

      for (const permission of request.permissions) {
        role.permissions.push(this.permission.create({ id: permission }));
      }

      return await this.repository.save(role);
    } catch (e) {
      if (e.code == '23505') {
        throw new ConflictException(`Name ${request.name} already exist !`);
      } else {
        throw new InternalServerErrorException(e);
      }
    }
  }

  async find(id: string): Promise<Role> {
    const role = await this.repository.findOne(id);
    if (!role) {
      throw new NotFoundException(`Data not found !`);
    }
    return role;
  }

  async update(id: string, request: UpdateDto): Promise<Role> {
    try {
      const role = await this.repository.findOne(id);
      if (!role) {
        throw new NotFoundException(`Data not found !`);
      }

      role.permissions = [];
      for (const permission of request.permissions) {
        role.permissions.push(this.permission.create({ id: permission }));
      }

      role.name = request.name;
      return await this.repository.save(role);
    } catch (e) {
      throw new InternalServerErrorException(e.getMessage);
    }
  }

  async delete(id: string): Promise<void> {
    const role = await this.repository.findOne(id);
    if (!role) {
      throw new NotFoundException(`Data not found !`);
    }

    role.permissions = [];
    await this.repository.save(role);
    await this.repository.update(id, { deleted_at: new Date() });

    // await this.repository.softRemove(role);
    // const result = await this.repository.delete({ id });
    // if (result.affected == 0) {
    //   throw new NotFoundException(`Data not found !`);
    // }
  }
}
