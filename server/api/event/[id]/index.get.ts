//get detail zona
import { H3Event } from "h3";
import prisma from "~/server/utils/prismaClient";

async function getOneEvent(event: H3Event) {
    const params = event.context.params as { id: string };

    const _event = await prisma.event.findFirst({ where: { id: params.id }, include: { user: true } });
    if (!_event) throw createError({ statusCode: 404, message: "event not found" });

    return { data: _event, message: "event fetched successfully" };
}

export type GetOneEventResponse = UnwrapPromise<ReturnType<typeof getOneEvent>>;
export default defineEventHandler(getOneEvent);
