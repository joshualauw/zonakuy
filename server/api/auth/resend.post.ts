import { sendEmailVerificationLink } from "~/server/service/emailService";
import prisma from "~/server/utils/prismaClient";

export default defineEventHandler(async (event) => {
    const email = await readBody<string>(event);

    if (!email) throw createError({ statusCode: 400, data: [{ path: "email", message: "email is required" }] });

    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) throw createError({ statusCode: 400, data: [{ path: "email", message: "user not found" }] });

    if (user.is_verified) {
        throw createError({ statusCode: 400, data: [{ path: "email", message: "email already verified" }] });
    }

    await sendEmailVerificationLink(user.email, user.username, user.verify_token!);

    return { data: null, message: "email verification link sended" };
});
