//get all sesi
import { H3Event } from "h3";
import prisma from "~/server/utils/prismaClient";

export interface GetAllSessionQuery {
    slug?: string;
}
async function getAllSession(event: H3Event) {
    const query = getQuery(event) as unknown as GetAllSessionQuery;
    const parameter = {};

    if (query.slug) {
        const eventExist = await prisma.event.findFirst({ where: { slug: query.slug } });
        if (!eventExist) throw createError({ statusCode: 404, message: "event not found" });
        Object.assign(parameter, { event_id: eventExist.id });
    }

    const sessions = await prisma.session.findMany({ where: parameter });
    return { data: sessions, message: "sessions fetched successfully" };
}

export type GetAllSessionResponse = UnwrapPromise<ReturnType<typeof getAllSession>>;

export default defineEventHandler(getAllSession);
