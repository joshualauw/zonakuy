import yup from "yup";
import { exclude } from "~/server/utils/helpers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "~/server/utils/prismaClient";
import { H3Event } from "h3";

const loginSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required(),
});

async function login(event: H3Event) {
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
}

export type LoginSchema = yup.InferType<typeof loginSchema>;
export type LoginResponse = UnwrapPromise<ReturnType<typeof login>>;

export default defineEventHandler(login);
