import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RefreshToken } from 'src/auth/entity/refresh-token.entity';
import { Role } from 'src/role/entity/role.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, nullable: true })
  photo: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({
    type: 'char',
    length: 36,
    nullable: true,
  })
  created_by: string;

  @Column({
    type: 'char',
    length: 36,
    nullable: true,
  })
  updated_by: string;

  // @ManyToOne(() => Role, (role) => role.users)
  // role: Role;
  @ManyToOne(() => Role, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;

  @DeleteDateColumn()
  deleted_at: Timestamp;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, {
    eager: true,
  })
  refreshTokens: RefreshToken[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
