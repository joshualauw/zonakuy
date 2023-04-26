import { exclude } from "~/server/utils/helpers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import prisma from "~/server/utils/prismaClient";
import { LoginSchema, loginSchema } from "~/server/schema/auth";

//login
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const validated = await schemaValidator<LoginSchema>(loginSchema, body);
    const config = useRuntimeConfig();

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
    await userIsValid(validated, user);

    const token = jwt.sign(exclude(user, ["password"]), config.JWT_SECRET, { expiresIn: "1d" });

    return { data: { user: exclude(user, ["password"]), token }, message: "login successful" };
});

async function userIsValid(value: LoginSchema, user: User) {
    if (!user.is_verified) {
        throw createError({
            statusCode: 401,
            message: ErrorType.unauthorized,
            data: "your account is not verified",
        });
    }
    if (!(await bcrypt.compare(value.password, user.password))) {
        throw createError({ statusCode: 401, message: ErrorType.unauthorized, data: "invalid credentials" });
    }
    if (user.is_banned) {
        throw createError({ statusCode: 401, message: ErrorType.unauthorized, data: "your account is banned" });
    }
}
