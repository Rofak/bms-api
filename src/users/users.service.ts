import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDto } from './dto/user-dto';
import { toUserDto } from '../shared/mapper';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user-dto';
import { UserEntity } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {
  }

  async findOne(option?: Object): Promise<UserDto> {
    const user = await this.userRepository.findOne(option);
    return toUserDto(user);
  }

  async findbyLogin({username,password}):Promise<UserDto>{
    const user=await this.userRepository.findOne({where:{username}})
    if(!user){
      throw new HttpException("User not found",HttpStatus.UNAUTHORIZED)
    }
    const areEqual=await bcrypt.compare(password,user.password)
    console.log(areEqual)
    if(!areEqual){
      throw new HttpException("Invalid credentials",HttpStatus.UNAUTHORIZED)
    }
    return toUserDto(user)
  }
  async findByPayload({ username }: any): Promise<UserDto> {
    return await this.findOne({
      where:  { username } });
  }
  async create(userDto: CreateUserDto): Promise<UserDto> {
    const { username, password, email } = userDto;

    // check if the user exists in the db
    const userInDb = await this.userRepository.findOne({
      where: { username }
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: UserEntity = await this.userRepository.create({ username, password, email, });
    await this.userRepository.save(user);
    return toUserDto(user);
  }
}
