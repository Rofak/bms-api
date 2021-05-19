import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtPayload } from './JwtPayload';
import { UserDto } from '../users/dto/user-dto';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user-dto';
import { RegistrationStatus } from './RegistrationStatus';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user-dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService,private readonly jwtService:JwtService ) {
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.userService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async register(userDto: CreateUserDto):
    Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'user registered',
    };
    try {
      await this.userService.create(userDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }
  async login(loginUserDto: LoginUserDto): Promise<any> {
    // find user in db
    const user = await this.userService.findbyLogin(loginUserDto);

    // generate and sign token
    const token = this._createToken(user);

    return {
      username: user.username, ...token,
    };
  }

  private _createToken({ username }: UserDto): any {
    const user: JwtPayload = { username };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: "1200s",
      accessToken,
    };
  }
}
