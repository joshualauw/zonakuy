import redis from "../utils/redis";

export async function verifyToken(key: string, value: string) {
    const token = await redis.get(key);
    if (!token || token !== value) {
        throw createError({ statusCode: 401, message: "invalid token or expired" });
    }

    await redis.del(key);
}
