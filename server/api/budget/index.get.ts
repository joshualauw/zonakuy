import { H3Event } from "h3";
import prisma from "~/server/utils/prismaClient";

export interface GetAllBudgetQuery {
    category?: string;
    id?: string;
}
//get all budget
async function getAllBudget(event: H3Event) {
    const query = getQuery(event) as unknown as GetAllBudgetQuery;
    const parameter = {};

    if (query.category) Object.assign(parameter, { category: query.category });
    if (query.id) {
        const eventExist = await prisma.event.findFirst({ where: { id: query.id } });
        if (!eventExist) throw createError({ statusCode: 404, message: "event not found" });
        Object.assign(parameter, { event_id: eventExist.id });
    }

    const budgets = await prisma.budget.findMany({ where: parameter });
    return { data: budgets, message: "budgets fetched successfully" };
}

export type GetAllBudgetResponse = UnwrapPromise<ReturnType<typeof getAllBudget>>;

export default defineEventHandler(getAllBudget);
