//register
import bcrypt from "bcrypt";
import { ErrorType } from "~/server/utils/constants";
import { exclude, generateRandomToken } from "~/server/utils/helpers";
import { schemaValidator } from "~/server/utils/validator";
import { RegisterSchema, registerSchema } from "~/server/schema/authSchema";
import { sendEmailVerificationLink } from "~/server/service/emailService";
import authService from "~/server/service/authService";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const validated = await schemaValidator<RegisterSchema>(registerSchema, body);
    const auth = authService();

    const usernameExist = await auth.findFirst({ where: { username: validated.username } });
    if (usernameExist) {
        throw createError({
            statusCode: 400,
            message: ErrorType.validation,
            data: [{ path: "username", message: "username already exist" }],
        });
    }

    const emailExist = await auth.findFirst({ where: { email: validated.email } });
    if (emailExist) {
        throw createError({
            statusCode: 400,
            message: ErrorType.validation,
            data: [{ path: "email", message: "email already exist" }],
        });
    }

    const verifyToken = generateRandomToken();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(validated.password, salt);

    const user = await auth.create({
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
