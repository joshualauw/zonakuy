import yup from "yup";
import { H3Event } from "h3";
import { sendEmailTokenLink, setEmailOptions } from "~/server/service/emailService";

import prisma from "~/server/utils/prismaClient";
import redis from "~/server/utils/redis";

export type TokenVerifyContext = "account-activation" | "forgot-password";

export const resendTokenSchema = yup.object({
    email: yup.string().email().required(),
    context: yup.string().oneOf(["account-activation", "forgot-password"]),
});

async function resendToken(event: H3Event) {
    const body = await readBody<ResendTokenSchema>(event);
    const validated = await schemaValidator<ResendTokenSchema>(resendTokenSchema, body);

    const user = await prisma.user.findFirst({ where: { email: validated.email } });
    if (!user) throw createError({ statusCode: 400, data: [{ path: "email", message: "user not found" }] });

    const context = validated.context as TokenVerifyContext;
    const verifyToken = generateRandomToken();
    let message, payload;

    if (context == "account-activation") {
        if (user.is_verified) {
            throw createError({ statusCode: 400, data: [{ path: "email", message: "account already verified" }] });
        }
        setEmailOptions("email-verification.hbs", "Email Activation Link");
        payload = { name: user.username };
        message = "email verification link sended";
    } else {
        setEmailOptions("password-recovery.hbs", "Password Recovery Link");
        payload = { email: user.email };
        message = "password recovery link sended";
    }

    await redis.set(`${context}:${user.email}`, verifyToken, { ex: 3600 * 6 });
    await sendEmailTokenLink(user.email, context, verifyToken, payload);

    return { data: null, message };
}

export type EmailResendResponse = UnwrapPromise<ReturnType<typeof resendToken>>;
export type ResendTokenSchema = yup.InferType<typeof resendTokenSchema>;
export type ResendTokenResponse = UnwrapPromise<ReturnType<typeof resendToken>>;

export default defineEventHandler(resendToken);
