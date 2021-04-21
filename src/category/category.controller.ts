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
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { Response } from 'express';
import { Create_category_dto } from './model/dto/create_category_dto';
import { ResponseMessage } from '../utils/ResponseMessage';
import { Category } from './model/category.entity';
import { INSERT_SUCCESSFULLY } from '../utils/ConstMessage';
import { Timestamp } from 'typeorm';

@Controller('categories')
@ApiTags('Categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createCategory(@Body() createCategoryDto: Create_category_dto, @Res() res: Response) {
    let responseMessage = new ResponseMessage<Category>();
    this.categoryService.createCategory(createCategoryDto).then((result) => {
      responseMessage.status = HttpStatus.CREATED;
      responseMessage.message=INSERT_SUCCESSFULLY;
      responseMessage.timeStamp=new Date()
      responseMessage.data=result;
      res.status(HttpStatus.CREATED).send(responseMessage);
    });

  }

  @Get()
  findAll(@Res() res: Response) {
    this.categoryService.findAll().then((result) => {
      res.status(HttpStatus.FOUND).send(result);
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe)id: number, @Res() res: Response) {
    this.categoryService.findOne(id).then((result) => {
      res.status(HttpStatus.FOUND).send(result);
    });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe)id: number, @Res() res: Response) {
    this.categoryService.delete(id).then((result) => {
      res.status(HttpStatus.OK).send('Deleted Successfully!');
    });
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id', ParseIntPipe)id: number, @Body() categoryDto: Create_category_dto, @Res() res: Response) {
    this.categoryService.update(id, categoryDto).then((result) => {
      res.status(HttpStatus.OK).send('Update Successfully!');
    });
  }
}
