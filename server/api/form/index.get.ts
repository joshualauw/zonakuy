import { H3Event } from "h3";
import prisma from "~/server/utils/prismaClient";

export interface GetAllFormQuery {
    event_id?: string;
}

async function getAllForm(event: H3Event) {
    const query = getQuery(event) as unknown as GetAllFormQuery;
    const parameter = {};
    if (query.event_id) {
        Object.assign(parameter, { event_id: query.event_id });
    }

    const forms = await prisma.form.findMany({ where: parameter });
    return { data: forms, message: "forms fetched successfully" };
}

export type GetAllFormResponse = UnwrapPromise<ReturnType<typeof getAllForm>>;

export default defineEventHandler(getAllForm);
