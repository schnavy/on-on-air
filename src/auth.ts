import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const USERNAME = process.env.AUTH_USERNAME;
const PASSWORD = process.env.AUTH_PASSWORD;

export const { auth, signIn, signOut, handlers } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (
          credentials?.username === USERNAME &&
          credentials?.password === PASSWORD
        ) {
          return { id: "1", name: USERNAME };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/admin");
      return isOnDashboard ? isLoggedIn : true;
    },
  },
  trustHost: true,
});
