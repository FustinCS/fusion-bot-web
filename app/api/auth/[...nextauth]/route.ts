import NextAuth, { SessionStrategy } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";

const authOptions = {
  session: { strategy: "jwt" as SessionStrategy },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      authorization: process.env.DISCORD_OAUTH_URL as string,
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
