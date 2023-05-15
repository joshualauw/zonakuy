export function exclude<T, Key extends keyof T>(obj: T, keys: Key[]): Omit<T, Key> {
    const newObj = { ...obj };
    for (const key of keys) {
        delete newObj[key];
    }
    return newObj;
}

export function generateRandomToken(length: number = 6) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from(Array(length), () => characters.charAt(Math.floor(Math.random() * characters.length))).join("");
}
