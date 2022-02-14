import { EntityRepository, Repository } from 'typeorm';
import { FilterDto } from 'src/role/dto/role.dto';
import { Role } from 'src/role/entity/role.entity';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
  async filter(filter: FilterDto): Promise<Role[]> {
    const { name } = filter;
    const query = this.createQueryBuilder('role');

    if (name) {
      query.andWhere('lower(role.name) LIKE :name', {
        name: `%${name.toLowerCase()}%`,
      });
    }

    return await query.getMany();
  }
}
