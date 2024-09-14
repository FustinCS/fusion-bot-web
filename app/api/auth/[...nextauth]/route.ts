import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";


const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      authorization: process.env.DISCORD_OAUTH_URL as string,
    }),
  ],
  adapter: PrismaAdapter(prisma),
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
