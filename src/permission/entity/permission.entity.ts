import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from 'src/role/entity/role.entity';

@Entity()
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  parent_menu: string;

  @Column({ nullable: true })
  parent_id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  alias: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  icon: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  @JoinTable()
  roles: Role[];
  // @ManyToMany(() => Role, (role) => role.permissions, { eager: true })
  // @JoinTable({
  //   name: 'role_permission',
  //   joinColumn: {
  //     name: 'role_id',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'permission_id',
  //     referencedColumnName: 'id',
  //   },
  // })
  // roles: Role[];
}
