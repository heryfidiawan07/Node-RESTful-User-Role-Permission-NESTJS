import { EntityRepository, Repository } from 'typeorm';
import { FilterDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entity/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // Example get auth user from user.service
  // async filter(user: User, filter: FilterDto): Promise<User[]> {
  async filter(filter: FilterDto): Promise<User[]> {
    const { name, email } = filter;

    const query = this.createQueryBuilder('user');
    // Implement where auth user id
    // .where(
    //   'user.id = :id',
    //   { id: user.id },
    // );

    if (name) {
      query.andWhere('lower(user.name) LIKE :name', {
        name: `%${name.toLowerCase()}%`,
      });
    }

    if (email) {
      query.andWhere('lower(user.email) LIKE :email', {
        email: `%${email.toLowerCase()}`,
      });
    }

    // if (age) {
    //     query.andWhere('user.age >= :age', { age });
    // }

    // if (age) {
    //     query.andWhere('user.age <= :age', { age });
    // }

    return await query.getMany();
  }
}
