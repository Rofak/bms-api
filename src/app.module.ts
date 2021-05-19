import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileController } from './file/file.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [BookModule, CategoryModule,TypeOrmModule.forRoot(), AuthModule, UsersModule],
  controllers: [AppController, FileController],
  providers: [AppService],
})
export class AppModule {}
