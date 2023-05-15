import yup from "yup";
import prisma from "~/server/utils/prismaClient";
import { H3Event } from "h3";
import { exclude } from "~/server/utils/helpers";

export const updateEventLocationSchema = yup.object({
    coordinate: yup.array(yup.number().required()).min(2).required(),
    country: yup.string().required(),
    city: yup.string().required(),
    street: yup.string().required(),
    venue: yup.string().required(),
    postal_code: yup.string().required(),
});

async function updateEventLocation(event: H3Event) {
    const params = event.context.params as { id: string };

    const body = await schemaValidator<UpdateEventLocationSchema>(updateEventLocationSchema, await readBody(event));

    const eventExist = await prisma.event.findFirst({ where: { id: params.id } });
    if (!eventExist) throw createError({ statusCode: 404, message: "event not found" });

    const _event = await prisma.event.update({
        where: { id: eventExist.id },
        data: {
            location: {
                latitude: body.coordinate[0],
                longitude: body.coordinate[1],
                ...exclude(body, ["coordinate"]),
            },
        },
    });

    return { data: _event, message: "event location updated successfully" };
}

export type UpdateEventLocationSchema = yup.InferType<typeof updateEventLocationSchema>;
export type UpdateEventLocationResponse = UnwrapPromise<ReturnType<typeof updateEventLocation>>;

export default defineEventHandler(updateEventLocation);
