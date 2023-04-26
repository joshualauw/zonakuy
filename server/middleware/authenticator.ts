import jwt from "jsonwebtoken";

const publicRoutes = ["/api/auth/login", "/api/auth/register", "/api/auth/verify"];

export default defineEventHandler((event) => {
    if (event.path && event.path.includes("/api") && !publicRoutes.includes(event.path)) {
        const authorization = event.node.req.headers.authorization;
        if (!authorization) {
            throw createError({ statusCode: 401, message: ErrorType.unauthorized, data: "jwt not provided" });
        }
        const config = useRuntimeConfig();
        try {
            const token = authorization.split(" ");
            const decoded = jwt.verify(token[token.length - 1], config.JWT_SECRET);
            //TODO: check jwt in database (optional: use redis for low-latency)
            event.context.auth = decoded;
        } catch (err: any) {
            throw createError({ statusCode: 500, message: ErrorType.server, data: err.message });
        }
    }
});
