import { User } from 'src/user/entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { RefreshToken } from '../entity/refresh-token.entity';

@EntityRepository(RefreshToken)
export class RefreshTokenRepository extends Repository<RefreshToken> {
  async createRefreshToken(user: User, ttl: number): Promise<RefreshToken> {
    const refreshToken = this.create();
    refreshToken.user = user;
    refreshToken.isRevoked = false;
    const expired_at = new Date();
    expired_at.setTime(expired_at.getTime() + ttl);
    refreshToken.expired_at = expired_at;

    return await refreshToken.save();
  }
}
