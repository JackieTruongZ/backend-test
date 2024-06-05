import jwt, { JwtPayload } from "jsonwebtoken";
import config from "config/default"

class JwtUtils {
    private static accessTokenSecret = 'iloveyou';

    public static signJwt(payload: any, expiresIn: { expiresIn: string }): string {
        return jwt.sign(payload, this.accessTokenSecret, expiresIn);
    }

    public static verifyJwt(token: string): JwtPayload | false {
        try {
            const decoded = jwt.verify(token, this.accessTokenSecret) as JwtPayload;

            // Kiểm tra hạn sử dụng
            const currentTimestamp = Math.floor(Date.now() / 1000);
            if (decoded.exp && decoded.exp < currentTimestamp) {
                return false;
            }

            return decoded;
        } catch (error) {
            throw new Error('Invalid access token');
        }
    }
}

export default JwtUtils;