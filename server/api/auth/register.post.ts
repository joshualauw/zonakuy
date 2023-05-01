//register
import prisma from "~/server/utils/prismaClient";
import bcrypt from "bcrypt";
import yup from "yup";
import { exclude, generateRandomToken } from "~/server/utils/helpers";
import { schemaValidator } from "~/server/utils/validator";
import { sendEmailVerificationLink } from "~/server/service/emailService";
import { H3Event } from "h3";

export const registerSchema = yup.object({
    username: yup
        .string()
        .required()
        .trim()
        .transform((v: string) => v.toLowerCase().replaceAll(" ", "")),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
    password_confirmation: yup.string().oneOf([yup.ref("password")], "password must match"),
});

async function register(event: H3Event) {
    const body = await readBody(event);
    const validated = await schemaValidator<RegisterSchema>(registerSchema, body);

    const usernameExist = await prisma.user.findFirst({ where: { username: validated.username } });
    if (usernameExist) {
        throw createError({ statusCode: 400, data: [{ path: "username", message: "username already exist" }] });
    }

    const emailExist = await prisma.user.findFirst({ where: { email: validated.email } });
    if (emailExist) {
        throw createError({ statusCode: 400, data: [{ path: "email", message: "email already exist" }] });
    }

    const verifyToken = generateRandomToken();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(validated.password, salt);

    const user = await prisma.user.create({
        data: {
            username: validated.username,
            display_name: validated.username,
            email: validated.email,
            password: hashedPassword,
            verify_token: verifyToken,
            role: "user",
        },
    });

    await sendEmailVerificationLink(user.email, user.username, verifyToken);

    return { data: exclude(user, ["password"]), message: "register successful! Please check your email" };
}

export type RegisterSchema = yup.InferType<typeof registerSchema>;
export type RegisterResponse = UnwrapPromise<ReturnType<typeof register>>;

export default defineEventHandler(register);
