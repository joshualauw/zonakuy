//update zona
import yup from "yup";
import prisma from "~/server/utils/prismaClient";
import { H3Event } from "h3";
import { exclude } from "~/server/utils/helpers";
import { User } from "@prisma/client";

const updateEventSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    limit: yup.number().required().min(1),
    price: yup.number().required(),
    date_range: yup.array(yup.date().required()).min(2).required(),
    tags: yup.array(yup.string().required()).required().min(1),
});

async function updateEvent(event: H3Event) {
    const params = event.context.params as { id: string };

    const body = await schemaValidator<UpdateEventSchema>(updateEventSchema, await readBody(event));
    const user = event.context.auth as Omit<User, "password">;

    const eventExist = await prisma.event.findFirst({ where: { id: params.id } });
    if (!eventExist) throw createError({ statusCode: 404, message: "event not found" });

    const _event = await prisma.event.update({
        where: { id: eventExist.id },
        data: {
            start_date: body.date_range[0],
            end_date: body.date_range[1],
            user_id: user.id,
            ...exclude(body, ["date_range"]),
        },
    });

    return { data: _event, message: "event updated successfully" };
}

export type UpdateEventSchema = yup.InferType<typeof updateEventSchema>;
export type UpdateEventResponse = UnwrapPromise<ReturnType<typeof updateEvent>>;

export default defineEventHandler(updateEvent);
