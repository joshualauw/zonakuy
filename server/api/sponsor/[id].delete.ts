//delete sponsor
import { H3Event } from "h3";
import { deleteSponsorLogo } from "~/server/service/fileUploadService";
import prisma from "~/server/utils/prismaClient";

async function deleteSponsor(event: H3Event) {
    const params = event.context.params as { id: string };

    const sponsorExist = await prisma.sponsor.findFirst({ where: { id: params.id } });
    if (!sponsorExist) throw createError({ statusCode: 404, message: "sponsor not found" });

    const sponsor = await prisma.sponsor.delete({
        where: { id: params.id },
    });
    await deleteSponsorLogo(sponsor.id);

    return { data: sponsor, message: "sponsor deleted successfully" };
}

export type DeleteSponsorResponse = UnwrapPromise<ReturnType<typeof deleteSponsor>>;

export default defineEventHandler(deleteSponsor);
