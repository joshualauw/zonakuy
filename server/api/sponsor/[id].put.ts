//update sponsor
import yup from "yup";
import { H3Event } from "h3";
import prisma from "~/server/utils/prismaClient";
import { uploadSponsorLogo } from "~/server/service/fileUploadService";
import { readFormData } from "~/server/utils/uploadFile";

const schema = yup.object({
    logo: yup
        .mixed()
        .transform((value) => (value === "" ? null : value))
        .required(),
    name: yup.string().required(),
    description: yup.string().required(),
});

async function handler(event: H3Event) {
    const body = await schemaValidator<UpdateSponsorSchema>(schema, await readFormData(event.node.req));
    const params = event.context.params as { id: string };

    const sponsorExist = await prisma.sponsor.findFirst({ where: { id: params.id } });
    if (!sponsorExist) throw createError({ statusCode: 404, message: "sponsor not found" });

    const sponsor = await prisma.sponsor.update({
        where: { id: params.id },
        data: exclude(body, ["logo"]),
    });

    await uploadSponsorLogo(sponsor.id, body.logo);

    return { data: sponsor, message: "sponsor updated successfully" };
}

type UpdateSponsorSchema = yup.InferType<typeof schema>;
export type UpdateSponsorPayload = Nullable<UpdateSponsorSchema>;
export type UpdateSponsorResponse = UnwrapPromise<ReturnType<typeof handler>>;

export default defineEventHandler(handler);
