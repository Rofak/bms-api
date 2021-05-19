import { IsEmail, IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';

export class UserDto {
  @IsNotEmpty()  id: string;
  @IsNotEmpty()  username: string;
  @IsNotEmpty()  @IsEmail()  email: string;
}