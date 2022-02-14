import {
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  Entity,
  JoinTable,
  OneToMany,
  ManyToMany,
  Timestamp,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { Permission } from 'src/permission/entity/permission.entity';

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;

  @DeleteDateColumn()
  deleted_at: Timestamp;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  // @ManyToMany(() => Permission, (permission) => permission.roles)
  // permissions: Permission[];
  @ManyToMany(() => Permission, (permission) => permission.roles, {
    eager: true,
    cascade: true,
  })
  @JoinTable({
    name: 'role_permission',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: Permission[];
}
