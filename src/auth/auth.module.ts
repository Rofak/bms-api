import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstants } from './jwtConstants';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './JwtStrategy';

@Module({
  imports:[UsersModule,PassportModule.register({
    defaultStrategy:'jwt',
    property:'user',
    session:false,
  }),
  JwtModule.register({
    secret:JwtConstants.secret,
    signOptions:{
      expiresIn:'1200s'
    }
  })
  ],
  providers: [AuthService,JwtStrategy],
  exports:[AuthService,JwtModule],
  controllers:[AuthController]
})
export class AuthModule {}
