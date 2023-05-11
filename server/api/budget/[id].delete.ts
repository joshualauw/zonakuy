//hapus budget
import { H3Event } from "h3";
import prisma from "~/server/utils/prismaClient";

async function deleteBudget(event: H3Event) {
    const params = event.context.params as { id: string };

    const budgetExist = await prisma.budget.findFirst({ where: { id: params.id } });
    if (!budgetExist) throw createError({ statusCode: 404, message: "budget not found" });

    const budget = await prisma.budget.delete({
        where: { id: params.id },
    });

    return { data: budget, message: "budget deleted successfully" };
}

export type DeleteBudgetResponse = UnwrapPromise<ReturnType<typeof deleteBudget>>;

export default defineEventHandler(deleteBudget);
