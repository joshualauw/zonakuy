//verify account
import { User } from "@prisma/client";
import prisma from "~/server/utils/prismaClient";
import { EmailVerifySchema, emailVerifySchema } from "~/server/schema/authSchema";

export default defineEventHandler(async (event) => {
    const body = await readBody<EmailVerifySchema>(event);
    const validated = await schemaValidator<EmailVerifySchema>(emailVerifySchema, body);

    let user;

    try {
        user = await prisma.user.findFirst({ where: { email: validated.email } });
    } catch (err) {
        throw createError({ statusCode: 500, message: ErrorType.database, data: err });
    }

    if (!user) throw createError({ statusCode: 404, message: ErrorType.not_found, data: "user not found" });
    await checkUserVerification(validated, user);

    try {
        await prisma.user.update({
            where: { id: user.id },
            data: { is_verified: true, verify_token: { unset: true } },
        });
    } catch (err) {
        throw createError({ statusCode: 500, message: ErrorType.database, data: err });
    }

    return { data: null, message: "email verified successfully" };
});

async function checkUserVerification(value: EmailVerifySchema, user: User) {
    if (user.is_verified) {
        throw createError({ statusCode: 401, message: ErrorType.unauthorized, data: "account already verified" });
    } else if (user.verify_token !== value.token) {
        throw createError({ statusCode: 401, message: ErrorType.unauthorized, data: "invalid token" });
    }
}
