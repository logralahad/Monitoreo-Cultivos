import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { _refreshToken } from 'src/utils/constants';

type JwtPayload = {
  sub: string;
  email: string;
  role: string;
};

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'JWT-REFRESH',
) {
  constructor() {
    super({
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: _refreshToken,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return { ...payload, refreshToken };
  }
}
