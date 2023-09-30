import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import axios from "axios";

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
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/auth/google`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            ...data,
          }
        );
        if (res && res.data?.accessToken) {
          user.firstname = res.data?.firstName;
          user.name = res.data?.name;
          user.email = res.data?.email;
          user.image = res.data?.image;
          user.accessToken = res.data?.accessToken;
          user.role = res.data?.role;
          user.accountName = res.data?.accountName;
          user.accountId = res.data?.accountId;
          user.exp = res.data?.exp;
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
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/auth/verify-token`,
        {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        }
      );
      if (res.data.valid) {
        const user = res.data.data
        session.user = {
          firstname: user.firstName,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          accountName: token.accountName,
          accountId: token.accountId,
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
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/auth/login`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            email: credentials?.email,
            password: credentials?.password,
          }
        );

        if (res && res.data) {
          return await res.data;
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
    newUser: "/auth/register",
  },
  ...authOptions,
});
