import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/entity/user.entity';

@Entity()
export class RefreshToken extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  isRevoked: boolean;

  @Column()
  expired_at: Date;

  // @ManyToOne(() => User, (user) => user.refreshTokens)
  // user: User;
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
