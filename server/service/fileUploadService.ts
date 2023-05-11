import prisma from "../utils/prismaClient";
import { fileDelete, fileUpload } from "../utils/uploadFile";

export async function uploadSponsorLogo(sponsor_id: string, image: any) {
    const file = image as { filepath: string };
    const { url } = await fileUpload(file.filepath, `zonakuy/sponsor/${sponsor_id}`);
    await prisma.sponsor.update({ where: { id: sponsor_id }, data: { logo: url } });
}

export async function deleteSponsorLogo(sponsor_id: string) {
    await fileDelete(`zonakuy/sponsor/${sponsor_id}`);
}
