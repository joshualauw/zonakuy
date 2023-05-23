import yup from "yup";
import prisma from "~/server/utils/prismaClient";
import { H3Event } from "h3";

const createFormSchema = yup.object({
    event_id: yup.string().required(),
});

async function createForm(event: H3Event) {
    const body = await schemaValidator<CreateFormSchema>(createFormSchema, await readBody(event));

    const eventExist = await prisma.event.findFirst({ where: { id: body.event_id } });
    if (!eventExist) throw createError({ statusCode: 404, message: "event not found" });

    const form = await prisma.form.create({
        data: {
            event_id: eventExist.id,
            name: "",
        },
    });

    return { data: form, message: "form created successfully" };
}

export type CreateFormSchema = yup.InferType<typeof createFormSchema>;
export type CreateFormResponse = UnwrapPromise<ReturnType<typeof createForm>>;

export default defineEventHandler(createForm);
