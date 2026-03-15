import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { EMAIL_VERIFICATION_ENABLED } from "@/lib/config";
import { authConfig } from "./auth.config";

class EmailNotVerifiedError extends CredentialsSignin {
  code = "unverified";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    ...authConfig.providers.filter(
      (p) => (p as { id?: string }).id !== "credentials"
    ),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) return null;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user?.hashedPassword) return null;

        const isValid = await bcrypt.compare(password, user.hashedPassword);
        if (!isValid) return null;

        if (EMAIL_VERIFICATION_ENABLED && !user.emailVerified) {
          throw new EmailNotVerifiedError();
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
        token.iat = Math.floor(Date.now() / 1000);
      }

      // On subsequent requests, check if sessions were invalidated
      if (token.id && !user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { tokenInvalidBefore: true },
        });

        if (dbUser?.tokenInvalidBefore) {
          const tokenIssuedAt = (token.iat as number) * 1000;
          if (tokenIssuedAt < dbUser.tokenInvalidBefore.getTime()) {
            // Token was issued before password change — invalidate
            return { ...token, invalidated: true };
          }
        }
      }

      return token;
    },
    session({ session, token }) {
      if (token?.invalidated) {
        // Force client to re-authenticate
        return { ...session, user: { ...session.user, id: "" } };
      }
      if (token?.id) {
        session.user.id = token.id as string;
      }
      if (token?.name) {
        session.user.name = token.name;
      }
      if (token?.email) {
        session.user.email = token.email;
      }
      if (token?.picture) {
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
});
