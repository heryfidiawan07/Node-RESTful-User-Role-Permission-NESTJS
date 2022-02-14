import { EntityRepository, Repository } from 'typeorm';
import { FilterDto } from 'src/permission/dto/permission.dto';
import { Permission } from 'src/permission/entity/permission.entity';

@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> {
  async filter(filter: FilterDto): Promise<Permission[]> {
    const { name } = filter;
    const query = this.createQueryBuilder('permission');

    if (name) {
      query.andWhere('lower(permission.name) LIKE :name', {
        name: `%${name.toLowerCase()}%`,
      });
    }

    return await query.getMany();
  }
}
