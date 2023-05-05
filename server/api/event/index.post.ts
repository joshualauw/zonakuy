import yup from "yup";
import slugify from "slugify";
import prisma from "~/server/utils/prismaClient";
import { H3Event } from "h3";
import { exclude } from "~/server/utils/helpers";
import { User } from "@prisma/client";

export const createEventSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    limit: yup.number().required().min(1),
    date_range: yup.array(yup.string().required()).min(2).required(),
    tags: yup.array(yup.string().required()).required().min(1),
});

async function createEvent(event: H3Event) {
    event.context.protected = true;

    const body = await readBody(event);
    const validated = await schemaValidator<CreateEventSchema>(createEventSchema, body);
    const user = event.context.auth as Omit<User, "password">;

    const _event = await prisma.event.create({
        data: {
            start_date: validated.date_range[0],
            end_date: validated.date_range[1],
            user_id: user.id,
            slug: slugify(validated.name),
            price: 0,
            ...exclude(validated, ["date_range"]),
        },
    });

    return { data: _event, message: "event created successfully" };
}

export type CreateEventSchema = yup.InferType<typeof createEventSchema>;
export type CreateEventResponse = UnwrapPromise<ReturnType<typeof createEvent>>;

export default defineEventHandler(createEvent);
