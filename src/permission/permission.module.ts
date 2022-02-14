import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionRepository } from 'src/permission/repository/permission.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { PermissionService } from 'src/permission/permission.service';
import { UserService } from 'src/user/user.service';
import { PermissionController } from 'src/permission/permission.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionRepository, UserRepository])],
  providers: [PermissionService, UserService],
  controllers: [PermissionController],
  exports: [PermissionService],
})
export class PermissionModule {}
