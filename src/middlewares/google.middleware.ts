import { NextFunction, Request, Response } from "express";
import passport from "passport";

export const googleMiddleware = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", (err, user, info) => {
        if (err) {
            return res.status(500).json({
                error: true,
                message: "Internal server error",
            });
        }
        if (!user) {
            return res.status(401).json({
                error: true,
                message: "Log in failure",
            });
        }
        req.user = user;
        res.redirect("http://localhost:3000");
        // req.user = user;
        // next();
    })(req, res, next);
}