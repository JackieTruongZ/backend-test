export default {
  port: 3333,
  origin: "http://localhost:4200",
  dbUri: "mongodb://localhost:27017/dev",
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  googleClientId:
    "505404240106-iq0kbjto829t8h3uj8p6lui8akn51t39.apps.googleusercontent.com",
  googleClientSecret: "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",
  googleOauthRedirectUrl: "http://localhost:3333/auth/google/callback",
};
