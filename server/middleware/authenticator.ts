import { H3Event } from "h3";
import jwt from "jsonwebtoken";

const publicRoutes = [
    { path: "/api/auth/login", method: "POST" },
    { path: "/api/auth/register", method: "POST" },
    { path: "/api/auth/verify", method: "PUT" },
    { path: "/api/auth/resend", method: "POST" },
    { path: "/api/auth/reset", method: "PUT" },
    { path: "/api/event", method: "GET" },
];

function isGuarded(event: H3Event) {
    return (
        event.path &&
        event.path.includes("/api") &&
        !publicRoutes.some((route) => {
            return route.path === event.path && route.method === event.node.req.method;
        })
    );
}

export default defineEventHandler((event) => {
    if (isGuarded(event)) {
        const authorization = event.node.req.headers.authorization;
        if (!authorization) {
            throw createError({ statusCode: 401, message: "jwt not provided" });
        }
        const config = useRuntimeConfig();
        try {
            const token = authorization.split(" ");
            const decoded = jwt.verify(token[token.length - 1], config.JWT_SECRET);
            //TODO: check jwt in database (optional: use redis for low-latency)
            event.context.auth = decoded;
        } catch (err: any) {
            throw createError({ statusCode: 500, message: err.message });
        }
    }
});
