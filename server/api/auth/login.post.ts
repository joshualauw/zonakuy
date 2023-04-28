import { exclude } from "~/server/utils/helpers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "~/server/utils/prismaClient";
import { LoginSchema, loginSchema } from "~/server/schema/authSchema";

//login
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const validated = await schemaValidator<LoginSchema>(loginSchema, body);
    const user = await loginValidation(validated);

    const config = useRuntimeConfig();
    const token = jwt.sign(exclude(user, ["password"]), config.JWT_SECRET, { expiresIn: "1d" });

    return { data: { user: exclude(user, ["password"]), token }, message: "login successful" };
});

async function loginValidation(validated: LoginSchema) {
    let user;

    try {
        user = await prisma.user.findFirst({
            where: {
                email: validated.email,
            },
        });
    } catch (err) {
        throw createError({ statusCode: 500, message: ErrorType.database, data: err });
    }
    if (!user) throw createError({ statusCode: 404, message: ErrorType.not_found, data: "user not found" });

    if (!user.is_verified) {
        throw createError({
            statusCode: 401,
            message: ErrorType.unauthorized,
            data: "your account is not verified",
        });
    }
    if (!(await bcrypt.compare(validated.password, user.password))) {
        throw createError({ statusCode: 401, message: ErrorType.unauthorized, data: "invalid credentials" });
    }
    if (user.is_banned) {
        throw createError({ statusCode: 401, message: ErrorType.unauthorized, data: "your account is banned" });
    }

    return user;
}
