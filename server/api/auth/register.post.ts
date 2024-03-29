//register
import prisma from "~/server/utils/prismaClient";
import bcrypt from "bcrypt";
import yup from "yup";
import { exclude, generateRandomToken } from "~/server/utils/helpers";
import { schemaValidator } from "~/server/utils/validator";
import { sendEmailTokenLink, setEmailOptions } from "~/server/service/emailService";
import { H3Event } from "h3";
import redis from "~/server/utils/redis";

const registerSchema = yup.object({
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
    const body = await schemaValidator<RegisterSchema>(registerSchema, await readBody(event));

    const usernameExist = await prisma.user.findFirst({ where: { username: body.username } });
    if (usernameExist) {
        throw createError({ statusCode: 400, data: [{ path: "username", message: "username already exist" }] });
    }

    const emailExist = await prisma.user.findFirst({ where: { email: body.email } });
    if (emailExist) {
        throw createError({ statusCode: 400, data: [{ path: "email", message: "email already exist" }] });
    }

    const verifyToken = generateRandomToken();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(body.password, salt);

    const user = await prisma.user.create({
        data: {
            ...exclude(body, ["password_confirmation"]),
            display_name: body.username,
            password: hashedPassword,
            role: "user",
        },
    });

    await redis.set(`account-activation:${user.email}`, verifyToken, { ex: 3600 * 6 });

    setEmailOptions("email-verification.hbs", "Email Activation Link");
    await sendEmailTokenLink(user.email, "account-activation", verifyToken, { name: user.username });

    return { data: exclude(user, ["password"]), message: "register successful! Please check your email" };
}

export type RegisterSchema = yup.InferType<typeof registerSchema>;
export type RegisterResponse = UnwrapPromise<ReturnType<typeof register>>;

export default defineEventHandler(register);
