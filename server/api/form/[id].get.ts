import { H3Event } from "h3";
import prisma from "~/server/utils/prismaClient";

async function getOneForm(event: H3Event) {
    const params = event.context.params as { id: string };

    const formExist = await prisma.form.findFirst({ where: { id: params.id } });
    if (!formExist) throw createError({ statusCode: 404, message: "form not found" });

    return { data: formExist, message: "form fetched successfully" };
}

export type GetOneFormResponse = UnwrapPromise<ReturnType<typeof getOneForm>>;

export default defineEventHandler(getOneForm);
