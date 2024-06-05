import qs from "qs";
import axios from 'axios';
import { UserGoogleAuth } from "@/interfaces/users.interface";

interface GoogleTokensResult {
  access_token: string;
  expires_in: Number;
  refresh_token: string;
  scope: string;
  id_token: string;
}

class AuthService {


  public getGoogleOAuthTokens = async (code: string): Promise<GoogleTokensResult> => {

    //-------- CREATE GOOGL API CALL GET TOKEN ------------------------

    const url = "https://oauth2.googleapis.com/token";

    const values = {
      code,
      client_id: "505404240106-iq0kbjto829t8h3uj8p6lui8akn51t39.apps.googleusercontent.com",
      client_secret: "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",
      redirect_uri: "http://localhost:3333/auth/google/callback",
      grant_type: "authorization_code",
    };

    //==================================================================

    //-------- CALL GOOGL API GET TOKEN -------------------------------------

    try {
      const res = await axios.post<GoogleTokensResult>(
        url,
        qs.stringify(values),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      // console.log("res data : ", res.data);

      return res.data;

      //=============================================================

    } catch (error: any) {
      console.error(error.response.data.error);

      throw new Error(error.message);
    }
  }



  public getGoogleUser = async ({ id_token, access_token }): Promise<UserGoogleAuth> => {

    //-------- CALL GOOGL API GET INFOR USER -------------------------------------

    try {
      const res = await axios.get<UserGoogleAuth>(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      );

      return res.data;
      //=================================================================================

    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default AuthService;
