//verify account
import yup from "yup";
import prisma from "~/server/utils/prismaClient";
import { H3Event } from "h3";
import { verifyToken } from "~/server/service/cacheService";

export const verifyEmailSchema = yup.object({
    email: yup.string().email().required(),
    token: yup.string().required(),
});

async function verifyEmail(event: H3Event) {
    const body = await readBody<VerifyEmailSchema>(event);
    const validated = await schemaValidator<VerifyEmailSchema>(verifyEmailSchema, body);

    const user = await prisma.user.findFirst({ where: { email: validated.email } });
    if (!user) throw createError({ statusCode: 404, message: "user not found" });

    if (user.is_verified) {
        throw createError({ statusCode: 401, message: "account already verified" });
    }

    await verifyToken(`account-activation:${user.email}`, validated.token);
    await prisma.user.update({ where: { id: user.id }, data: { is_verified: true } });

    return { data: user.id, message: "email verified successfully, account activated!" };
}

export type VerifyEmailSchema = yup.InferType<typeof verifyEmailSchema>;
export type VerifyEmailResponse = UnwrapPromise<ReturnType<typeof verifyEmail>>;

export default defineEventHandler(verifyEmail);
