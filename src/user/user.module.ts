import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserService } from 'src/user/user.service';
import { UserController } from 'src/user/user.controller';
import { FileController } from 'src/user/file.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService],
  controllers: [UserController, FileController],
  exports: [UserService],
})
export class UserModule {}
