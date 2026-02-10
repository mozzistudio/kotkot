import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compareSync } from 'bcryptjs';
import { prisma } from './prisma';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const broker = await prisma.broker.findUnique({
          where: { email: credentials.email },
        });

        if (!broker) return null;

        const isValid = compareSync(credentials.password, broker.passwordHash);
        if (!isValid) return null;

        return {
          id: broker.id,
          email: broker.email,
          companyName: broker.companyName,
          brandName: broker.brandName,
          primaryColor: broker.primaryColor,
          plan: broker.plan,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.companyName = (user as any).companyName;
        token.brandName = (user as any).brandName;
        token.primaryColor = (user as any).primaryColor;
        token.plan = (user as any).plan;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).companyName = token.companyName;
        (session.user as any).brandName = token.brandName;
        (session.user as any).primaryColor = token.primaryColor;
        (session.user as any).plan = token.plan;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
