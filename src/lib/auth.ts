import { auth } from "@clerk/nextjs/server";

export const requireClerkUser = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User must be authenticated.");
  }

  return userId;
};
