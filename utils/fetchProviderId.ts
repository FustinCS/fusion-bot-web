import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

export async function getProviderId() : Promise<string | undefined> {
  const session = await getServerSession(authOptions);

  // website user
  if (session) {
    const account = await prisma.account.findFirst({
      where: {
        userId: session.user.id, // Filter by user ID
      },
      select: {
        providerAccountId: true, // Select only the provider account ID
        provider: true, // Optionally, select the provider name
      },
    });

    if (!account) {
      return undefined;
    }

    return account.providerAccountId;
  }
  return undefined
  // TODO: implement external access (through a client or a bot (e.g., Discord bot))

  // external access (through a client or a bot (e.g., Discord bot))
  // else {
  //     // fetch Oauth2 provider id
  //     const providerId = req.nextUrl.searchParams.get("discordId");
  // }
}
