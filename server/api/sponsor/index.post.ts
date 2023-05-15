import { exclude } from "~/server/utils/helpers";
import yup from "yup";
import { H3Event } from "h3";
import prisma from "~/server/utils/prismaClient";
import { readFormData } from "~/server/utils/uploadFile";
import { uploadSponsorLogo } from "~/server/service/fileUploadService";

const schema = yup.object({
    event_id: yup.string().required(),
    logo: yup
        .mixed()
        .transform((value) => (value === "" ? null : value))
        .required(),
    name: yup.string().required(),
    description: yup.string().required(),
});

async function handler(event: H3Event) {
    const body = await schemaValidator<CreateSponsorSchema>(schema, await readFormData(event.node.req));

    const eventExist = await prisma.event.findFirst({ where: { id: body.event_id } });
    if (!eventExist) throw createError({ statusCode: 404, message: "event not found" });

    const sponsor = await prisma.sponsor.create({
        data: exclude(body, ["logo"]),
    });

    await uploadSponsorLogo(sponsor.id, body.logo);

    return { data: sponsor, message: "sponsor created successfully" };
}

type CreateSponsorSchema = yup.InferType<typeof schema>;
export type CreateSponsorPayload = Nullable<CreateSponsorSchema>;
export type CreateSponsorResponse = UnwrapPromise<ReturnType<typeof handler>>;

export default defineEventHandler(handler);
