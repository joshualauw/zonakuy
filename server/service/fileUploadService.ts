import { Form, Speaker } from "@prisma/client";
import prisma from "../utils/prismaClient";
import { fileDelete, fileUpload } from "../utils/uploadFile";

export async function uploadSponsorLogo(sponsor_id: string, image: any) {
    const file = image as { filepath: string };
    const { secure_url } = await fileUpload(file.filepath, `zonakuy/sponsor/${sponsor_id}`);
    await prisma.sponsor.update({ where: { id: sponsor_id }, data: { logo: secure_url } });
}

export async function deleteSponsorLogo(sponsor_id: string) {
    await fileDelete(`zonakuy/sponsor/${sponsor_id}`);
}

export async function uploadSpeakerAvatar(session_id: string, speakers: Speaker[], images: any[]) {
    const files = images as { filepath: string }[];
    let newSpeakers: Speaker[] = [];

    await fileDelete(`zonakuy/speaker/${session_id}`);
    for (let i = 0; i < images.length; i++) {
        const { secure_url } = await fileUpload(files[i].filepath, `zonakuy/speaker/${session_id}/${i}`);
        newSpeakers.push({
            ...speakers[i],
            avatar: secure_url,
        });
    }

    await prisma.session.update({ where: { id: session_id }, data: { speaker: newSpeakers } });
}

export async function uploadEventBannerAndGallery(event_id: string, banner: any, gallery: any[]) {
    const file = banner as { filepath: string };
    const { secure_url } = await fileUpload(file.filepath, `zonakuy/banner/${event_id}`);
    const files = gallery as { filepath: string }[];

    const newGallery = [];
    await fileDelete(`zonakuy/gallery/${event_id}`);
    for (let i in files) {
        const { secure_url } = await fileUpload(files[i].filepath, `zonakuy/gallery/${event_id}/${i}`);
        newGallery.push(secure_url);
    }

    return await prisma.event.update({ where: { id: event_id }, data: { banner: secure_url, gallery: newGallery } });
}

export async function uploadFormImages(form: Form, images: { file: { filepath: string }; idx: number }[]) {
    await fileDelete(`zonakuy/form/${form.id}/fields`);
    for (let i in images) {
        const { secure_url } = await fileUpload(
            images[i].file.filepath,
            `zonakuy/form/${form.id}/fields/${images[i].idx}`
        );
        form.fields[images[i].idx].image = secure_url;
    }

    return await prisma.form.update({ where: { id: form.id }, data: { fields: form.fields } });
}

export async function deleteFormImages(form_id: string) {
    await fileDelete(`zonakuy/form/${form_id}/fields`);
}
