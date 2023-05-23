import { H3Event } from "h3";
import { deleteFormImages } from "~/server/service/fileUploadService";
import prisma from "~/server/utils/prismaClient";

async function deleteForm(event: H3Event) {
    const params = event.context.params as { id: string };

    const formExist = await prisma.form.findFirst({ where: { id: params.id } });
    if (!formExist) throw createError({ statusCode: 404, message: "form not found" });

    const form = await prisma.form.delete({
        where: { id: params.id },
    });
    await deleteFormImages(formExist.id);

    return { data: form, message: "form deleted successfully" };
}

export type DeleteFormResponse = UnwrapPromise<ReturnType<typeof deleteForm>>;

export default defineEventHandler(deleteForm);
