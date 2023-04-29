import { exclude } from "~/server/utils/helpers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { LoginSchema, loginSchema } from "~/server/schema/authSchema";
import prisma from "~/server/utils/prismaClient";

//login
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const validated = await schemaValidator<LoginSchema>(loginSchema, body);
    const config = useRuntimeConfig();

    const user = await prisma.user.findFirst({ where: { email: validated.email } });
    if (!user) throw createError({ statusCode: 404, message: "user not found" });

    if (!user.is_verified) {
        throw createError({ statusCode: 401, message: "your account is not verified" });
    }
    if (!(await bcrypt.compare(validated.password, user.password))) {
        throw createError({ statusCode: 401, message: "invalid credentials" });
    }
    if (user.is_banned) {
        throw createError({ statusCode: 401, message: "your account is banned" });
    }

    const token = jwt.sign(exclude(user, ["password"]), config.JWT_SECRET, { expiresIn: "1d" });

    return { data: { user: exclude(user, ["password"]), token }, message: "login successful" };
});
