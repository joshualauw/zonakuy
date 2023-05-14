import { exclude } from "~/server/utils/helpers";
import yup from "yup";
import { H3Event } from "h3";
import prisma from "~/server/utils/prismaClient";

export const createSessionSchema = yup.object({
    slug: yup.string().required(),
    title: yup.string().required(),
    description: yup.string().required(),
    day: yup.date().required(),
    time: yup.array(yup.string().required()).min(2).required(),
});

async function createSession(event: H3Event) {
    const body = await schemaValidator<CreateSessionSchema>(createSessionSchema, await readBody(event));

    const eventExist = await prisma.event.findFirst({ where: { slug: body.slug } });
    if (!eventExist) throw createError({ statusCode: 404, message: "event not found" });

    const session = await prisma.session.create({
        data: {
            event_id: eventExist.id,
            start_time: body.time[0],
            end_time: body.time[1],
            speaker: [],
            ...exclude(body, ["slug", "time"]),
        },
    });

    return { data: session, message: "session created successfully" };
}

export type CreateSessionSchema = yup.InferType<typeof createSessionSchema>;
export type CreateSessionResponse = UnwrapPromise<ReturnType<typeof createSession>>;

export default defineEventHandler(createSession);
