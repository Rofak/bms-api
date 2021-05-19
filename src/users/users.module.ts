import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Module({
  imports:[TypeOrmModule.forFeature([UserRepository])],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
