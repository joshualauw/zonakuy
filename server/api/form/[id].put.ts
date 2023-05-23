import yup from "yup";
import { H3Event } from "h3";
import prisma from "~/server/utils/prismaClient";
import { readFormData } from "~/server/utils/uploadFile";
import { FormType } from "@prisma/client";
import { uploadFormImages } from "~/server/service/fileUploadService";

const saveFormSchema = yup.object({
    name: yup.string().required(),
    fields: yup
        .array(
            yup.object({
                question: yup.string().required(),
                image: yup.mixed().required(),
                type: yup.string().required(),
                required: yup.bool().required(),
                options: yup.array(yup.string().required()).required(),
            })
        )
        .required(),
});

async function saveForm(event: H3Event) {
    const stream = await readFormData(event.node.req);

    const formattedStream = {
        name: stream.name,
        fields: [] as any[],
    };
    for (let i = 0; i < stream.required.length; i++) {
        formattedStream.fields.push({
            required: stream.required[i] === "1",
            question: stream.question[i],
            type: stream.type[i],
            options: stream.options[i] === "" ? [] : stream.options[i],
            image: stream[`image[${i}]`] ?? "",
        });
    }

    const body = await schemaValidator<SaveFormSchema>(saveFormSchema, formattedStream);
    const params = event.context.params as { id: string };

    const formExist = await prisma.form.findFirst({ where: { id: params.id } });
    if (!formExist) throw createError({ statusCode: 404, message: "form not found" });

    const form = await prisma.form.update({
        where: { id: params.id },
        data: { ...body, fields: body.fields.map((f) => ({ ...exclude(f, ["image"]), type: f.type as FormType })) },
    });

    const images: any[] = [];
    body.fields.forEach((f, idx) => {
        if (f.image !== "") images.push({ file: f.image, idx });
    });
    await uploadFormImages(form, images);

    return { data: form, message: "form updated successfully" };
}

export type SaveFormSchema = yup.InferType<typeof saveFormSchema>;
export type SaveFormResponse = UnwrapPromise<ReturnType<typeof saveForm>>;

export default defineEventHandler(saveForm);
