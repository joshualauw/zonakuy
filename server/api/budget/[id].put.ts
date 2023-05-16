//update budget
import yup from "yup";
import { H3Event } from "h3";
import prisma from "~/server/utils/prismaClient";

const expenseScema = yup.object({
    name: yup.string().required(),
    amount: yup.number().required(),
});

const updateBudgetSchema = yup.object({
    name: yup.string().required(),
    limit: yup.number().min(1).required(),
    category: yup.string().required(),
    expenses: yup.array(expenseScema).min(0).required(),
});

async function updateBudget(event: H3Event) {
    const body = await schemaValidator<UpdateBudgetSchema>(updateBudgetSchema, await readBody(event));
    const params = event.context.params as { id: string };

    const budgetExist = await prisma.budget.findFirst({ where: { id: params.id } });
    if (!budgetExist) throw createError({ statusCode: 404, message: "budget not found" });

    const budget = await prisma.budget.update({
        where: { id: params.id },
        data: {
            ...body,
            current: body.expenses.reduce((total, cur) => total + cur.amount, 0),
        },
    });

    return { data: budget, message: "budget updated successfully" };
}

export type UpdateBudgetSchema = yup.InferType<typeof updateBudgetSchema>;
export type UpdateBudgetResponse = UnwrapPromise<ReturnType<typeof updateBudget>>;

export default defineEventHandler(updateBudget);
