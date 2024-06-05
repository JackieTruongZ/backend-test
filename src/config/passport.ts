import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import passport from "passport";
import UserService from "@/services/users.service";
import { Request, Response } from "express";

class PassportConfig {
    protected userService: UserService;
    constructor() {
        this.configureGoogleStrategy();
        this.configureSerialization();
        this.userService = new UserService();
    }

    private configureGoogleStrategy(): void {
        const profileScope: string = "https://www.googleapis.com/auth/userinfo.profile"
        const emailScope: string = "https://www.googleapis.com/auth/userinfo.email"
        const numberphoneScope: string = "https://www.googleapis.com/auth/user.phonenumbers.read"
        passport.use(
            new GoogleStrategy(
                {
                    clientID: "505404240106-iq0kbjto829t8h3uj8p6lui8akn51t39.apps.googleusercontent.com",
                    clientSecret: "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",
                    callbackURL: "/auth/google/callback",
                    scope: [
                        'https://www.googleapis.com/auth/userinfo.profile',
                        'https://www.googleapis.com/auth/userinfo.email',
                        'https://www.googleapis.com/auth/user.phonenumbers.read',
                        'https://www.googleapis.com/auth/user.addresses.read',
                        'https://www.googleapis.com/auth/profile.agerange.read'
                    ],
                },
                (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void) => {

                    // Check if google profile exist.
                    console.log('profile :', profile);

                    // console.log(req.cookies);

                    if (profile.id) {

                        this.userService.passportLoginHandle(profile, done);

                    }
                }
            )
        );
    }

    private configureSerialization(): void {
        passport.serializeUser<any, any>((user: any, done: (err: any, id?: any) => void) => {
            done(null, user);
        });

        passport.deserializeUser<any, any>((user: any, done: (err: any, user?: any) => void) => {
            done(null, user);
        });
    }
}

export default new PassportConfig();