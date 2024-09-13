import NextAuth, { NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { JWT } from 'next-auth/jwt';
import { DefaultSession, Session } from 'next-auth';

// Extend the Session interface to include a user id
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

// Define your authentication options
const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      authorization: process.env.DISCORD_OAUTH_URL as string,
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session, token: JWT }) {
      if (token) {
        if (token.picture?.includes("discord") && typeof token.sub === 'string') {
          session.user.id = token.sub;
        }
      }
      return session;
    },
    async redirect({ baseUrl }: { baseUrl: string }) {
      return baseUrl + "/list";
    },
  },
};

// Create the NextAuth handler
const handler = NextAuth(authOptions);

// Export the handler for GET and POST methods
export { handler as GET, handler as POST };
