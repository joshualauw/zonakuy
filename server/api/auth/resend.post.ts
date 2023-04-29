import authService from "~/server/service/authService";
import { sendEmailVerificationLink } from "~/server/service/emailService";

export default defineEventHandler(async (event) => {
    const email = await readBody<string>(event);
    const auth = authService();

    if (!email)
        throw createError({
            statusCode: 400,
            message: ErrorType.validation,
            data: [{ path: "email", message: "email is required" }],
        });

    const user = await auth.findFirst({ where: { email } });

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
