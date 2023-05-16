import { exclude } from "~/server/utils/helpers";
import yup from "yup";
import { H3Event } from "h3";
import prisma from "~/server/utils/prismaClient";
import { readFormData } from "~/server/utils/uploadFile";
import { uploadSponsorLogo } from "~/server/service/fileUploadService";

const createSponsorSchema = yup.object({
    event_id: yup.string().required(),
    logo: yup
        .mixed()
        .transform((value) => (value === "" ? null : value))
        .required(),
    name: yup.string().required(),
    description: yup.string().required(),
});

async function createSponsor(event: H3Event) {
    const body = await schemaValidator<CreateSponsorSchema>(createSponsorSchema, await readFormData(event.node.req));

    const eventExist = await prisma.event.findFirst({ where: { id: body.event_id } });
    if (!eventExist) throw createError({ statusCode: 404, message: "event not found" });

    const sponsor = await prisma.sponsor.create({
        data: exclude(body, ["logo"]),
    });

    await uploadSponsorLogo(sponsor.id, body.logo);

    return { data: sponsor, message: "sponsor created successfully" };
}

export type CreateSponsorSchema = yup.InferType<typeof createSponsorSchema>;
export type CreateSponsorResponse = UnwrapPromise<ReturnType<typeof createSponsor>>;

export default defineEventHandler(createSponsor);
