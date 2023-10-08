import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();

    const user = getUser();
    if (!user.id || !user.email) throw new TRPCError({ code: "UNAUTHORIZED" });

    // chck if the user is in the database
    const dbUser = await db.user.findFirst({
      where: { id: user.id },
    });

    if (!dbUser) {
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
        },
      });
    }
    return { success: true };
  }),
  getUsrFiles: privateProcedure.query(async ({ ctx }) => {
    return await db.file.findMany({
      where: {
        userId: ctx.userId,
      },
    });
  }),
});

export type AppRouter = typeof appRouter;
