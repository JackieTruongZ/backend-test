import { CookieOptions, NextFunction, Response } from 'express';
import moment from 'moment';
import { HttpException } from '@exceptions/HttpException';

import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@/interfaces/users.interface';
import { Session } from '@/interfaces/session.interface';

import SessionService from '@/services/session.service';
import UserService from '@/services/users.service';
import JwtUtils from '@/utils/jwt';
import { JwtPayload } from 'jsonwebtoken';
import config from '@/config/default'

const sessionService: SessionService = new SessionService();
const userService: UserService = new UserService();


const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
  domain: "localhost",
  path: "/",
  sameSite: "lax",
  secure: false,
};

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    // Kiểm tra xem có tồn tại mã thông báo truy cập và mã thông báo làm mới hay không
    if (!accessToken || !refreshToken) {
      return res.status(401).json({ message: 'Vui lòng đăng nhập' });
    }

    //--------------------- DECODE ACCESSTOKEN ---------------------------
    const decodedAccessToken = JwtUtils.verifyJwt(accessToken) as JwtPayload;

    //======================================================================

    //--------------------- CHECK EXP ACCESSTOKEN ---------------------------
    if (!decodedAccessToken) {

      //--------------------- DECODE REFRESHTOKEN ---------------------------
      const decodedRefreshToken = JwtUtils.verifyJwt(refreshToken) as JwtPayload;

      //--------------------- CHECK EXP REFRESHTOKEN ---------------------------
      if (!decodedRefreshToken) {
        res.redirect('http://localhost:3000/login')
      }

      //--------------------- CFEATE NEW ACCESSTOKEN ---------------------------
      const newAccesstoken = JwtUtils.signJwt(
        { ...decodedAccessToken, session: decodedAccessToken.session },
        { expiresIn: config.accessTokenTtl } // 15 minutes
      );

      res.cookie("accessToken", newAccesstoken, accessTokenCookieOptions);

    }

    req.user = decodedAccessToken;

    next();

  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
