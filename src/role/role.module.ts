import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from 'src/role/repository/role.repository';
import { PermissionRepository } from 'src/permission/repository/permission.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { RoleService } from 'src/role/role.service';
import { UserService } from 'src/user/user.service';
import { RoleController } from 'src/role/role.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoleRepository,
      PermissionRepository,
      UserRepository,
    ]),
  ],
  providers: [RoleService, UserService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
