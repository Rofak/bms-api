import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class Create_book_dto {
  @IsString({ message: 'title must be string' })
  @IsNotEmpty({ message: 'title is not empty' })
  @ApiProperty()
  title: string;
  @IsString({ message: 'author must be string' })
  @IsNotEmpty({ message: 'author is not empty' })
  @ApiProperty()
  author: string;
  @IsString({ message: 'author must be string' })
  @IsNotEmpty({ message: 'author is not empty' })
  @ApiProperty()
  description: string;
  @IsString({ message: 'thumbnail must be string' })
  @IsNotEmpty({ message: 'thumbnail is not empty' })
  @ApiProperty()
  thumbnail:string;
  @ApiProperty()
  @IsNumber()
  categoryId:number;
}