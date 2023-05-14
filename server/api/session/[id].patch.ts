//update sesi
import yup from "yup";
import { H3Event } from "h3";
import prisma from "~/server/utils/prismaClient";
import { uploadSpeakerAvatar } from "~/server/service/fileUploadService";

const speakerSchema = yup.object({
    avatar: yup.string().required(),
    name: yup.string().required(),
    role: yup.string().required(),
});

export const saveSpeakerSchema = yup.array(speakerSchema).min(1).required();

async function saveSpeaker(event: H3Event) {
    const stream = await handleFileStream(event.node.req);
    const formattedStream = [];
    for (let i = 0; i < stream.speaker.name.length; i++) {
        const { name, role } = stream.speaker;
        formattedStream.push({
            name: name[i],
            role: role[i],
            avatar: stream[`speaker[avatar][${i}]`],
        });
    }

    const body = await schemaValidator<SaveSpeakerSchema>(saveSpeakerSchema, formattedStream);
    const params = event.context.params as { id: string };

    const sessionExist = await prisma.session.findFirst({ where: { id: params.id } });
    if (!sessionExist) throw createError({ statusCode: 404, message: "session not found" });

    const session = await prisma.session.update({
        where: { id: params.id },
        data: {
            speaker: body,
        },
    });

    await uploadSpeakerAvatar(
        session.id,
        session.speaker,
        body.map((b, idx) => stream[`speaker[avatar][${idx}]`])
    );

    return { data: session, message: "speakers saved successfully" };
}

export type SaveSpeakerSchema = yup.InferType<typeof saveSpeakerSchema>;
export type SaveSpeakerResponse = UnwrapPromise<ReturnType<typeof saveSpeaker>>;

export default defineEventHandler(saveSpeaker);
