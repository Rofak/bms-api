import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtConstants } from './jwtConstants';
import { UserDto } from '../users/dto/user-dto';
import { JwtPayload } from './JwtPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      secretOrKey: JwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload):Promise<UserDto>{
      const user=await this.authService.validateUser(payload)
      if(!user){
        throw new HttpException("Invalid Token",HttpStatus.UNAUTHORIZED)
      }
      return user
  }
}