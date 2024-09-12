import { DefaultSession, Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import DiscordProvider from "next-auth/providers/discord";

export const AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      authorization: "https://discord.com/oauth2/authorize?client_id=1102733971529408633&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fdiscord&scope=identify+email+connections",
    }),
  ],
  callbacks: {
    async session({session, token}: {session: Session, token: JWT}) {
      if (token) {
        if (token?.picture?.includes("discord")) {
          if (typeof token.sub === 'string') {
            session.user.id = token.sub;
          }
        }
      }
      return session;
    },
    
    async redirect({ baseUrl }: { baseUrl: string }) {
      return baseUrl + "/list";
    },
  },
};

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };