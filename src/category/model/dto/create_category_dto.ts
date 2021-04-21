import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class Create_category_dto {
  @ApiProperty()
  @IsNotEmpty({message:"title can not be empty"})
  @IsString({message:"title must be string"})
  title: string;
}