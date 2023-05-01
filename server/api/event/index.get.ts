import { H3Event } from "h3";
import prisma from "~/server/utils/prismaClient";

export interface GetAllEventQuery {
    user_id?: string;
}

async function getAllEvent(event: H3Event) {
    const query = getQuery(event) as unknown as GetAllEventQuery;
    const parameter = {};
    if (query.user_id) {
        Object.assign(parameter, { user_id: query.user_id });
    }

    const events = await prisma.event.findMany({ where: parameter });
    return { data: events, message: "event fetched successfully" };
}

export type GetAllEventResponse = UnwrapPromise<ReturnType<typeof getAllEvent>>;

export default defineEventHandler(getAllEvent);
