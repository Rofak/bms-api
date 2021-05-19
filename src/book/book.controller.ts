import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res, UseGuards,
  UsePipes, ValidationPipe,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Create_book_dto } from './model/dto/create_book_dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
@ApiTags("Book")
@UseGuards(AuthGuard('jwt'))
export class BookController {
  constructor(private bookService: BookService) {
  }

  @Post()
  @UsePipes(new ValidationPipe())
  insert(@Body() createBookDto: Create_book_dto, @Res() res: Response) {
    this.bookService.insert(createBookDto).then(result => {
      res.status(HttpStatus.CREATED).send(result);
    });

  }

  @Get()
  findAll(@Res() res: Response) {
    this.bookService.findAll().then((result) => {
      console.log(result[0])
      res.status(HttpStatus.FOUND).send(result);
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe)id: number, @Res() res: Response) {
    this.bookService.findOne(id).then((result) => {
      res.status(HttpStatus.FOUND).send(result);
    });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe)id: number, @Res() res: Response) {
    this.bookService.delete(id).then((result) => {
      res.status(HttpStatus.OK).send('Deleted Successfully!');
    });
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id', ParseIntPipe)id: number, @Body() book: Create_book_dto, @Res() res: Response) {
    this.bookService.update(id, book).then((result)=>{
      res.status(HttpStatus.OK).send("Update Successfully!")
    });
  }
}
