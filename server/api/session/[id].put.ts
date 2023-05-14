//update sesi
import yup from "yup";
import { H3Event } from "h3";
import prisma from "~/server/utils/prismaClient";

export const updateSessionSchema = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    day: yup.date().required(),
    time: yup.array(yup.string().required()).min(2).required(),
});

async function updateSession(event: H3Event) {
    const body = await schemaValidator<UpdateSessionSchema>(updateSessionSchema, await readBody(event));
    const params = event.context.params as { id: string };

    const sessionExist = await prisma.session.findFirst({ where: { id: params.id } });
    if (!sessionExist) throw createError({ statusCode: 404, message: "session not found" });

    const session = await prisma.session.update({
        where: { id: params.id },
        data: {
            start_time: body.time[0],
            end_time: body.time[1],
            ...exclude(body, ["time"]),
        },
    });

    return { data: session, message: "session updated successfully" };
}

export type UpdateSessionSchema = yup.InferType<typeof updateSessionSchema>;
export type UpdateSessionResponse = UnwrapPromise<ReturnType<typeof updateSession>>;

export default defineEventHandler(updateSession);
