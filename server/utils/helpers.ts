import Joi from "joi";

export function errorFormatter(err: Joi.ValidationError) {
    return err.details.map((e) => e.message);
}

export function exclude<T, Key extends keyof T>(obj: T, keys: Key[]): Omit<T, Key> {
    for (const key of keys) {
        delete obj[key];
    }
    return obj;
}

export function generateRandomToken(length: number = 6) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from(Array(length), () => characters.charAt(Math.floor(Math.random() * characters.length))).join("");
}
