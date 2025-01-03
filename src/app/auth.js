import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const login = async () => {
  const login = await fetch("https://google.com");
  console.log("login=>", login);
  if (login.status == "ok") {
    return { role: "user" };
  }
};
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ account, profile }) {
      console.log("account=>", account);
      console.log("profile=>", profile);
      return { ...profile, role: "user" }; // Do different verification for other providers that don't have `email_verified`
    },
    //  By default, the `id` property does not exist on `token` or `session`. See the [TypeScript](https://authjs.dev/getting-started/typescript) on how to add it.
    jwt({ token, user }) {
      // console.log("user in JWT=>", user);

      token.role = "user";
      token._id = "jgdbmwyahcmftshm25smf6mdj777";
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user._id = token._id;
      return session;
    },
  },
});
