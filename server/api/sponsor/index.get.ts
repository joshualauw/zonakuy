//get all sponsor
import { H3Event } from "h3";
import prisma from "~/server/utils/prismaClient";

export interface GetAllSponsorQuery {
    id?: string;
}
async function getAllSponsor(event: H3Event) {
    const query = getQuery(event) as unknown as GetAllSponsorQuery;
    const parameter = {};

    if (query.id) {
        const eventExist = await prisma.event.findFirst({ where: { id: query.id } });
        if (!eventExist) throw createError({ statusCode: 404, message: "event not found" });
        Object.assign(parameter, { event_id: eventExist.id });
    }

    const sponsors = await prisma.sponsor.findMany({ where: parameter });
    return { data: sponsors, message: "sponsors fetched successfully" };
}

export type GetAllSponsorResponse = UnwrapPromise<ReturnType<typeof getAllSponsor>>;

export default defineEventHandler(getAllSponsor);
