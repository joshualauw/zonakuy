import { exclude } from "~/server/utils/helpers";
import yup from "yup";
import { H3Event } from "h3";
import prisma from "~/server/utils/prismaClient";

const expenseSchema = yup.object({
    name: yup.string().required(),
    amount: yup.number().min(0).required(),
});

export const createBudgetSchema = yup.object({
    slug: yup.string().required(),
    name: yup.string().required(),
    limit: yup.number().min(0).required(),
    category: yup.string().required(),
    expenses: yup.array(expenseSchema).min(0).required(),
});

async function createBudget(event: H3Event) {
    const body = await schemaValidator<CreateBudgetSchema>(createBudgetSchema, await readBody(event));

    const eventExist = await prisma.event.findFirst({ where: { slug: body.slug } });
    if (!eventExist) throw createError({ statusCode: 404, message: "event not found" });

    const budget = await prisma.budget.create({
        data: {
            ...exclude(body, ["slug"]),
            event_id: eventExist.id,
            current: body.expenses.reduce((total, cur) => total + cur.amount, 0),
        },
    });

    return { data: budget, message: "budget created successfully" };
}

export type CreateBudgetSchema = yup.InferType<typeof createBudgetSchema>;
export type CreateBudgetResponse = UnwrapPromise<ReturnType<typeof createBudget>>;

export default defineEventHandler(createBudget);
