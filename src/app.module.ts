import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileController } from './file/file.controller';

@Module({
  imports: [BookModule, CategoryModule,TypeOrmModule.forRoot()],
  controllers: [AppController, FileController],
  providers: [AppService],
})
export class AppModule {}
