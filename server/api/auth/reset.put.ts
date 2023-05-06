import bcrypt from "bcrypt";
import { H3Event } from "h3";
import yup from "yup";
import { verifyToken } from "~/server/service/cacheService";
import prisma from "~/server/utils/prismaClient";

export const resetPasswordSchema = yup.object({
    email: yup.string().required(),
    token: yup.string().required(),
    password: yup.string().required().min(6),
    password_confirmation: yup.string().oneOf([yup.ref("password")], "password must match"),
});

async function resetPassword(event: H3Event) {
    const body = await readBody(event);
    const validated = await schemaValidator<ResetPasswordSchema>(resetPasswordSchema, body);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(body.password, salt);

    await verifyToken(`forgot-password:${validated.email}`, validated.token);
    const user = await prisma.user.update({ where: { email: validated.email }, data: { password: hashedPassword } });

    return { data: user, message: "password reset successful!" };
}

export type ResetPasswordSchema = yup.InferType<typeof resetPasswordSchema>;
export type ResetPasswordResponse = UnwrapPromise<ReturnType<typeof resetPassword>>;

export default defineEventHandler(resetPassword);
