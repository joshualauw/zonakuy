//update file zona
import yup from "yup";
import prisma from "~/server/utils/prismaClient";
import { H3Event } from "h3";
import { exclude } from "~/server/utils/helpers";
import { User } from "@prisma/client";
import { uploadEventBannerAndGallery } from "~/server/service/fileUploadService";

const updateEventFileSchema = yup.object({
    banner: yup
        .mixed()
        .transform((value) => (value === "" ? null : value))
        .required(),
    gallery: yup.array(yup.mixed().required()).required(),
});

async function updateEventFile(event: H3Event) {
    const params = event.context.params as { id: string };

    const body = await schemaValidator<UpdateEventFileSchema>(
        updateEventFileSchema,
        await readFormData(event.node.req)
    );

    const eventExist = await prisma.event.findFirst({ where: { id: params.id } });
    if (!eventExist) throw createError({ statusCode: 404, message: "event not found" });

    const _event = await uploadEventBannerAndGallery(eventExist.id, body.banner, body.gallery);

    return { data: _event, message: "event files updated successfully" };
}

export type UpdateEventFileSchema = yup.InferType<typeof updateEventFileSchema>;
export type UpdateEventFileResponse = UnwrapPromise<ReturnType<typeof updateEventFile>>;

export default defineEventHandler(updateEventFile);
