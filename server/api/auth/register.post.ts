//register
import bcrypt from "bcrypt";

import { exclude, generateRandomToken } from "~/server/utils/helpers";
import { schemaValidator } from "~/server/utils/validator";
import { RegisterSchema, registerSchema } from "~/server/schema/authSchema";
import { sendEmailVerificationLink } from "~/server/service/emailService";
import prisma from "~/server/utils/prismaClient";

export default defineEventHandler(async (event) => {
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
});
