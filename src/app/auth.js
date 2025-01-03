import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github"
const SignIn = async () => {
  const login = await fetch("https://google.com");
  return { role: "user", _id: "pokjdbbsmmjehhbamh222b=llm>n210" };
};
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google,GitHub],
  callbacks: {
    async signIn({ account, profile }) {
      console.log("account=>", account);
      console.log("profile=>", profile);
      return { ...profile, role: "user" }; // Do different verification for other providers that don't have `email_verified`
    },
    //  By default, the `id` property does not exist on `token` or `session`. See the [TypeScript](https://authjs.dev/getting-started/typescript) on how to add it.
    async jwt({ token, user }) {
      console.log("user in JWT=>", token);
      const loginToserver = await SignIn();
      console.log("loginToserver=>", loginToserver);

      (token.role = loginToserver.role), (token._id = loginToserver._id);
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
