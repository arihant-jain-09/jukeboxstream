import NextAuth from "next-auth/next";

function CognitoProvider(options) {
  return {
    id: "cognito",
    name: "Cognito",
    type: "oauth",
    wellKnown: `${options.issuer}/.well-known/openid-configuration`,
    idToken: true,
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      };
    },
    options,
  };
}

export default NextAuth({
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      issuer: process.env.COGNITO_DOMAIN,
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    jwt({ token, account, profile }) {
      if (account) {
        console.log("Account exists");
        // modify token
        token.role = profile["cognito:groups"];
        token.id = profile.sub;
        token.access_token = account.access_token;
        token.accessTokenExpires = Date.now() + account.expires_at * 1000;
        token.refreshToken = account.refresh_token;
        // console.log(token);
        // token.accessTokenExpires = Date.now() + account.expires_in * 1000;
        // token.refreshToken = account.refresh_token;
      }
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },

    session({ session, token }) {
      if (session.user) {
        // modify session
        session.user.accessToken = token.access_token;
        session.user.roles = token.role;
        session.user.id = token.id;
        console.log(session.user);
      }
      return session;
    },
  },
});
