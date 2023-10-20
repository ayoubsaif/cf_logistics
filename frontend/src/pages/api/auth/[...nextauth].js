import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { get, post } from "@/utils/RequestFactory";

export const authOptions = {
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider == "google" && profile.email_verified == true) {
        const data = {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          email: profile?.email,
          image: profile?.picture,
          googleId: profile?.sub,
        };
        const res = await post(
          `${process.env.NEXT_PUBLIC_API}/auth/google`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
        if (res && res.accessToken) {
          user.firstname = res.firstName;
          user.name = res.name;
          user.email = res.email;
          user.image = res.image;
          user.accessToken = res.accessToken;
          user.role = res.role;
          user.account = {
            id: res.account.accountId,
            name: res.account.name,
            company: res.account.company
          }
          user.exp = res.exp;
          return true;
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.user) {
        user = { ...user, ...session.user };
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      // Verify token with backend
      const res = await get(
        `${process.env.NEXT_PUBLIC_API}/auth/verify-token`,
        {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        }
      );
      
      if (res && res.data && res.data?.email) {
        session.user = {
          firstname: res.data.firstName,
          name: res.data.name,
          email: res.data.email,
          image: res.data.image,
          role: res.data.role,
          account: {
            id: token.account.id,
            name: token.account.name,
            company: token.account.company
          },
          accessToken: token.accessToken,
        };
      } else {
        // Token is invalid or expired, clear session
        session = null;
      }
      return session;
    },
  },
};

const providers = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {},
    async authorize(credentials, req) {
      const res = await post(
        `${process.env.NEXT_PUBLIC_API}/auth/login`,
        { ...credentials },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res) {
        return await res;
      }
      return {
        status: "error",
        error: "Invalid credentials",
      };
    },
  }),
  // only add GoogleProvider if client id and secret are set
  GoogleProvider({
    clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID,
    clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET,
  }),
];

export default NextAuth({
  providers,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/auth/login",
    // newUser: "/auth/register",
  },
  ...authOptions,
});
