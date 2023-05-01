//verify account
import yup from "yup";
import prisma from "~/server/utils/prismaClient";
import { H3Event } from "h3";

export const emailVerifySchema = yup.object({
    email: yup.string().email().required(),
    token: yup.string().required(),
});

async function emailVerify(event: H3Event) {
    const body = await readBody<EmailVerifySchema>(event);
    const validated = await schemaValidator<EmailVerifySchema>(emailVerifySchema, body);

    const user = await prisma.user.findFirst({ where: { email: validated.email } });
    if (!user) throw createError({ statusCode: 404, message: "user not found" });

    if (user.is_verified) {
        throw createError({ statusCode: 401, message: "account already verified" });
    } else if (user.verify_token !== validated.token) {
        throw createError({ statusCode: 401, message: "invalid token" });
    }

    await prisma.user.update({
        where: { id: user.id },
        data: { is_verified: true, verify_token: { unset: true } },
    });

    return { data: null, message: "email verified successfully" };
}

export type EmailVerifySchema = yup.InferType<typeof emailVerifySchema>;
export type EmailVerifyResponse = UnwrapPromise<ReturnType<typeof emailVerify>>;

export default defineEventHandler(emailVerify);
