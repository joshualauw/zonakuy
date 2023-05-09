export function generateErrorChecks(errors: ValidationError[], props: Record<string, any>): Record<string, string> {
    const result: Record<string, string> = {};
    Object.keys(props).forEach((prop) => {
        const errorIndex = errors.map((e) => e.path).findIndex((p) => p == prop);
        Object.assign(result, { [prop]: errorIndex >= 0 ? errors[errorIndex].message : "" });
    });
    return result;
}

export function deserialize<T>(payload: any): T {
    return JSON.parse(JSON.stringify(payload));
}

export function genId(length: number = 6) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from(Array(length), () => characters.charAt(Math.floor(Math.random() * characters.length))).join("");
}
