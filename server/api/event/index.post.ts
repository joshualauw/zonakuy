import { exclude } from "~/server/utils/helpers";
import { User } from "@prisma/client";
import { CreateEventSchema, createEventSchema } from "~/server/schema/eventSchema";
import slugify from "slugify";
import prisma from "~/server/utils/prismaClient";

//buat zona
export default defineEventHandler(async (event): Promise<{ data: any; message: string }> => {
    const body = await readBody(event);
    const validated = await schemaValidator<CreateEventSchema>(createEventSchema, body);
    const user = event.context.auth as Omit<User, "password">;

    const _event = await prisma.event.create({
        data: {
            start_date: validated.date_range[0],
            end_date: validated.date_range[1],
            user_id: user.id,
            slug: slugify(validated.name),
            ...exclude(validated, ["date_range"]),
        },
    });

    return { data: _event, message: "event created successfully" };
});
