import { Speaker } from "@prisma/client";
import prisma from "../utils/prismaClient";
import { fileDelete, fileUpload } from "../utils/uploadFile";

export async function uploadSponsorLogo(sponsor_id: string, image: any) {
    const file = image as { filepath: string };
    console.log(file);
    const { secure_url } = await fileUpload(file.filepath, `zonakuy/sponsor/${sponsor_id}`);
    await prisma.sponsor.update({ where: { id: sponsor_id }, data: { logo: secure_url } });
}

export async function deleteSponsorLogo(sponsor_id: string) {
    await fileDelete(`zonakuy/sponsor/${sponsor_id}`);
}

export async function uploadSpeakerAvatar(session_id: string, speakers: Speaker[], image: any[]) {
    const files = image as { filepath: string }[];
    let newSpeakers: Speaker[] = [];
    console.log(files);

    await fileDelete(`zonakuy/speaker/${session_id}`);
    for (let i = 0; i < image.length; i++) {
        const { secure_url } = await fileUpload(files[i].filepath, `zonakuy/speaker/${session_id}/${i}`);
        newSpeakers.push({
            ...speakers[i],
            avatar: secure_url,
        });
    }

    await prisma.session.update({ where: { id: session_id }, data: { speaker: newSpeakers } });
}
