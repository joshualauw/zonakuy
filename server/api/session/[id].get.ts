import { H3Event } from "h3";
import prisma from "~/server/utils/prismaClient";

async function getOneSession(event: H3Event) {
    const params = event.context.params as { id: string };

    const session = await prisma.session.findFirst({ where: { id: params.id } });
    if (!session) throw createError({ statusCode: 404, message: "session not found" });

    return { data: session, message: "session fetched successfully" };
}

export type GetOneSessionResponse = UnwrapPromise<ReturnType<typeof getOneSession>>;
export default defineEventHandler(getOneSession);
