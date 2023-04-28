import { sendEmailVerificationLink } from "~/server/service/emailService";
import prisma from "~/server/utils/prismaClient";

export default defineEventHandler(async (event) => {
    const email = await readBody<string>(event);
    if (!email)
        throw createError({
            statusCode: 400,
            message: ErrorType.validation,
            data: [{ path: "email", message: "email is required" }],
        });

    let user;
    try {
        user = await prisma.user.findFirst({ where: { email: email } });
    } catch (err) {
        throw createError({ statusCode: 500, message: ErrorType.database, data: err });
    }

    if (!user) {
        throw createError({
            statusCode: 400,
            message: ErrorType.validation,
            data: [{ path: "email", message: "email not found" }],
        });
    }
    if (user.is_verified) {
        throw createError({
            statusCode: 400,
            message: ErrorType.validation,
            data: [{ path: "email", message: "email already verified" }],
        });
    }

    await sendEmailVerificationLink(user.email, user.username, user.verify_token!);

    return { data: null, message: "email verification link sended" };
});
