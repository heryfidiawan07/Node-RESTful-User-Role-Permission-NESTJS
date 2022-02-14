import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateDto,
  UpdateDto,
  FilterDto,
} from 'src/permission/dto/permission.dto';
import { Permission } from 'src/permission/entity/permission.entity';
import { PermissionRepository } from 'src/permission/repository/permission.repository';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionRepository)
    private readonly repository: PermissionRepository,
  ) {}

  async all(search: FilterDto): Promise<Permission[]> {
    return await this.repository.filter(search);
  }

  async create(request: CreateDto): Promise<Permission> {
    const { parent_menu, parent_id, name, alias, url, icon } = request;

    try {
      return await this.repository.save({
        parent_menu,
        parent_id,
        name,
        alias,
        url,
        icon,
      });
    } catch (e) {
      if (e.code == '23505') {
        throw new ConflictException(`Name ${name} already used !`);
      } else {
        throw new InternalServerErrorException(e);
      }
    }
  }

  async find(id: string): Promise<Permission> {
    const permission = await this.repository.findOne(id);
    if (!permission) {
      throw new NotFoundException(`Data not found !`);
    }
    return permission;
  }

  async update(id: string, request: UpdateDto): Promise<Permission> {
    const { parent_menu, parent_id, name, alias, url, icon } = request;

    try {
      await this.repository.update(id, {
        parent_menu,
        parent_id,
        name,
        alias,
        url,
        icon,
      });

      return await this.repository.findOne(id);
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
}
