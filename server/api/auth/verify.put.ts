//verify account
import { EmailVerifySchema, emailVerifySchema } from "~/server/schema/authSchema";
import prisma from "~/server/utils/prismaClient";

export default defineEventHandler(async (event) => {
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
});
