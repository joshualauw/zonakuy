//verify account
import { EmailVerifySchema, emailVerifySchema } from "~/server/schema/authSchema";
import authService from "~/server/service/authService";

export default defineEventHandler(async (event) => {
    const body = await readBody<EmailVerifySchema>(event);
    const validated = await schemaValidator<EmailVerifySchema>(emailVerifySchema, body);
    const auth = authService();

    const user = await auth.findFirst({ where: { email: validated.email } });
    if (user.is_verified) {
        throw createError({ statusCode: 401, message: ErrorType.unauthorized, data: "account already verified" });
    } else if (user.verify_token !== validated.token) {
        throw createError({ statusCode: 401, message: ErrorType.unauthorized, data: "invalid token" });
    }

    await auth.update({
        where: { id: user.id },
        data: { is_verified: true, verify_token: { unset: true } },
    });

    return { data: null, message: "email verified successfully" };
});
