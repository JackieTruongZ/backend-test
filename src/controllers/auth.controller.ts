import { CookieOptions, NextFunction, Request, Response } from 'express';
import moment from 'moment';
import useragent from 'useragent';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@/interfaces/users.interface';
import AuthService from '@/services/auth.service';
import UserService from '@/services/users.service';
import SessionService from '@/services/session.service';
import BaseController from '@/base/base.controller';
import JwtUtils from '@/utils/jwt';
import config from "@/config/default";
// import { Session } from '@/interfaces/session.interface';

const passport = require("passport");

const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
  domain: "localhost",
  path: "/",
  sameSite: "lax",
  secure: false,
};

const refreshTokenCookieOptions: CookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 3.154e10, // 1 year
};

class AuthController {

  async loginSuccess(req: RequestWithUser, res: Response, next: NextFunction) {
    // console.log('user : ', req.user);

    if (req.user) {
      res.status(200).json({
        error: false,
        message: "Successfully Loged In",
        user: req.user,
      });
    } else {
      res.status(403).json({ error: true, message: "Not Authorized" });
    }
  }

  async google(req: Request, res: Response, next: NextFunction) {

    //-------- CREATE GOOGL API CALL AUTHENTICATE ------------------------
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

    const options = {
      redirect_uri: `https://backend-test-6h4p.onrender.com/auth/google/callback`,
      client_id: "505404240106-iq0kbjto829t8h3uj8p6lui8akn51t39.apps.googleusercontent.com",
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/user.phonenumbers.read',
        'https://www.googleapis.com/auth/user.addresses.read',
        'https://www.googleapis.com/auth/profile.agerange.read'
      ].join(" "),
    };

    const qs = new URLSearchParams(options);

    //================================================================

    res.redirect(`${rootUrl}?${qs.toString()}`);
  }

  async googleCallBack(req: RequestWithUser, res: Response, next: NextFunction) {

    const userService: UserService = new UserService();
    const authService: AuthService = new AuthService();
    const sessionService: SessionService = new SessionService();

    const code = req.query.code as string;

    try {

      //---------- GET TOKEN OF GOOGLE TO GET INFOR USER -----------------
      const { id_token, access_token } = await authService.getGoogleOAuthTokens(code);

      //===================================================================

      //---------- GET INFOR USER BY TOKEN -----------------
      const googleUser = await authService.getGoogleUser({ id_token, access_token });

      //====================================================================
      if (!googleUser.verified_email) {
        return res.status(403).send("Google account is not verified");
      }

      //---------- CHECK AND SAVE USER BY TOKEN -----------------

      const user = await userService.findAndUpdateUser(googleUser);


      //=========================================================


      //---------- CREATE OR UPDATE SESSION -----------------
      const getDeviceInfo = (userAgentString) => {
        const agent = useragent.parse(userAgentString);
        return {
          browser: agent.family,
          os: agent.os.family,
          device: agent.device.family
        };
      }

      const sessionData: any = {
        userId: user._id,
        startTime: moment().utc().toISOString(), // Thời gian bắt đầu phiên đăng nhập
        expirationTime: moment().utc().add(1, 'hour').toISOString(), // Thời gian hết hạn phiên đăng nhập (ví dụ: 1 giờ sau khi tạo phiên)
        ipAddress: req.ip, // Địa chỉ IP của người dùng
        userAgent: req.headers['user-agent'], // Thông tin trình duyệt của người dùng
        deviceInfo: getDeviceInfo(req.headers['user-agent']) // Thông tin thiết bị của người dùng
      };

      const session = await sessionService.createSession(sessionData);

      //===========================================


      //---------- CREATE TOKEN ---------------------------
      const accessToken = JwtUtils.signJwt(
        { ...user, session: session._id },
        { expiresIn: config.accessTokenTtl } // 15 minutes
      );

      const refreshToken = JwtUtils.signJwt(
        { ...user, session: session._id },
        { expiresIn: config.refreshTokenTtl } // 1 year
      );
      //=================================================

      //---------- ADD TOKEN ON COOKIE -----------------

      res.cookie("accessToken", accessToken, accessTokenCookieOptions);

      res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

      //=================================================

      res.redirect(config.origin);

    } catch (error) {
      console.log("error : ", error);

      return res.redirect(`${config.origin}/oauth/error`);
    }
  }

}

export default AuthController;


