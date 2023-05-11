import { H3Event } from "h3";
import prisma from "~/server/utils/prismaClient";

async function getOneSponsor(event: H3Event) {
    const params = event.context.params as { id: string };

    const sponsor = await prisma.sponsor.findFirst({ where: { id: params.id } });
    if (!sponsor) throw createError({ statusCode: 404, message: "sponsor not found" });

    return { data: sponsor, message: "sponsor fetched successfully" };
}

export type GetOneSponsorResponse = UnwrapPromise<ReturnType<typeof getOneSponsor>>;
export default defineEventHandler(getOneSponsor);
