import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Placeholder for real DB check
        // We will integrate Prisma adapter later when DB is ready
        if (!credentials?.email || !credentials?.password) return null;
        
        if (credentials.email === "admin@supere.com" && credentials.password === "password") {
          return {
            id: "1",
            name: "Super Admin",
            email: "admin@supere.com",
            role: "SUPER_ADMIN",
          };
        }
        
        if (credentials.email === "vendor@supere.com" && credentials.password === "password") {
          return {
            id: "2",
            name: "Test Vendor",
            email: "vendor@supere.com",
            role: "VENDOR",
          };
        }
        
        return null;
      }
    })
  ],
  pages: {
    signIn: "/login",
    error: "/login", // Error code passed in query string as ?error=
    verifyRequest: "/otp", 
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role || "CUSTOMER";
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
