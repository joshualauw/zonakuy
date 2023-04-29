import { exclude } from "~/server/utils/helpers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { LoginSchema, loginSchema } from "~/server/schema/authSchema";
import authService from "~/server/service/authService";

//login
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const validated = await schemaValidator<LoginSchema>(loginSchema, body);
    const auth = authService();

    const user = await auth.findFirst({ where: { email: validated.email } });

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

    const config = useRuntimeConfig();
    const token = jwt.sign(exclude(user, ["password"]), config.JWT_SECRET, { expiresIn: "1d" });

    return { data: { user: exclude(user, ["password"]), token }, message: "login successful" };
});
