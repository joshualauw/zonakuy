//register
import bcrypt from "bcrypt";
import { ErrorType } from "~/server/utils/constants";
import prisma from "~/server/utils/prismaClient";
import { exclude, generateRandomToken } from "~/server/utils/helpers";
import { schemaValidator } from "~/server/utils/validator";
import { RegisterSchema, registerSchema } from "~/server/schema/authSchema";
import { sendEmailVerificationLink } from "~/server/service/emailService";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const validated = await schemaValidator<RegisterSchema>(registerSchema, body);
    await registerValidation(validated);

    let user;
    const verifyToken = generateRandomToken();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hashSync(validated.password, salt);

        user = await prisma.user.create({
            data: {
                username: validated.username,
                display_name: validated.username,
                email: validated.email,
                password: hashedPassword,
                verify_token: verifyToken,
                role: "user",
            },
        });
    } catch (err) {
        throw createError({ statusCode: 500, message: ErrorType.database, data: err });
    }

    await sendEmailVerificationLink(user.email, user.username, verifyToken);

    return { data: exclude(user, ["password"]), message: "register successful! Please check your email" };
});

async function registerValidation(validated: RegisterSchema) {
    let usernameExist, emailExist;

    try {
        usernameExist = await prisma.user.findFirst({ where: { username: validated.username } });
    } catch (err) {
        throw createError({ statusCode: 500, message: ErrorType.database, data: err });
    }
    if (usernameExist) {
        throw createError({
            statusCode: 400,
            message: ErrorType.validation,
            data: [{ path: "username", message: "username already exist" }],
        });
    }

    try {
        emailExist = await prisma.user.findFirst({ where: { email: validated.email } });
    } catch (err) {
        throw createError({ statusCode: 500, message: ErrorType.database, data: err });
    }
    if (emailExist) {
        throw createError({
            statusCode: 400,
            message: ErrorType.validation,
            data: [{ path: "email", message: "email already exist" }],
        });
    }
}
