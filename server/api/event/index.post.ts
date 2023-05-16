import yup from "yup";
import slugify from "slugify";
import prisma from "~/server/utils/prismaClient";
import { H3Event } from "h3";
import { exclude } from "~/server/utils/helpers";
import { User } from "@prisma/client";

const createEventSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    limit: yup.number().required().min(1),
    date_range: yup.array(yup.date().required()).min(2).required(),
    tags: yup.array(yup.string().required()).required().min(1),
});

async function createEvent(event: H3Event) {
    const body = await schemaValidator<CreateEventSchema>(createEventSchema, await readBody(event));
    const user = event.context.auth as Omit<User, "password">;

    const _event = await prisma.event.create({
        data: {
            start_date: body.date_range[0],
            end_date: body.date_range[1],
            user_id: user.id,
            price: 0,
            ...exclude(body, ["date_range"]),
        },
    });

    return { data: _event, message: "event created successfully" };
}

export type CreateEventSchema = yup.InferType<typeof createEventSchema>;
export type CreateEventResponse = UnwrapPromise<ReturnType<typeof createEvent>>;

export default defineEventHandler(createEvent);
