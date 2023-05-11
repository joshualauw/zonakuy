import { H3Event } from "h3";
import prisma from "~/server/utils/prismaClient";

async function getOneBudget(event: H3Event) {
    const params = event.context.params as { id: string };

    const budget = await prisma.budget.findFirst({ where: { id: params.id } });
    if (!budget) throw createError({ statusCode: 404, message: "budget not found" });

    return { data: budget, message: "budget fetched successfully" };
}

export type GetOneBudgetResponse = UnwrapPromise<ReturnType<typeof getOneBudget>>;
export default defineEventHandler(getOneBudget);
