import { exclude } from "~/server/utils/helpers";
import yup from "yup";
import { H3Event } from "h3";
import prisma from "~/server/utils/prismaClient";
import { handleFileStream } from "~/server/utils/uploadFile";
import { uploadSponsorLogo } from "~/server/service/fileUploadService";

export const createSponsorSchema = yup.object({
    slug: yup.string().required(),
    logo: yup.string().required(),
    name: yup.string().required(),
    description: yup.string().required(),
});

async function createSponsor(event: H3Event) {
    const stream = await handleFileStream(event.node.req);
    const body = await schemaValidator<CreateSponsorSchema>(createSponsorSchema, stream);

    const eventExist = await prisma.event.findFirst({ where: { slug: body.slug } });
    if (!eventExist) throw createError({ statusCode: 404, message: "event not found" });

    const sponsor = await prisma.sponsor.create({
        data: {
            ...exclude(body, ["slug"]),
            event_id: eventExist.id,
        },
    });

    await uploadSponsorLogo(sponsor.id, stream.logo);

    return { data: sponsor, message: "sponsor created successfully" };
}

export type CreateSponsorSchema = yup.InferType<typeof createSponsorSchema>;
export type CreateSponsorResponse = UnwrapPromise<ReturnType<typeof createSponsor>>;

export default defineEventHandler(createSponsor);
