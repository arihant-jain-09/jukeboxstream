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
      issuer: process.env.COGNITO_DOAMIN,
    }),
  ],
  callbacks: {
    jwt({ token, account, profile }) {
      if (account) {
        console.log("Account exists");
        // modify token
        token.role = profile["cognito:groups"];
      }
      return token;
    },

    session({ session, token }) {
      if (session.user) {
        // modify session
        session.user.roles = token.role;
      }
      return session;
    },
  },
});
