export function generateErrors(errors: ValidationError[]): Record<string, string> {
    const formattedErrors = {};
    errors.forEach((error) => {
        const { path, message } = error;
        Object.assign(formattedErrors, { [path]: message });
    });
    return formattedErrors;
}

export function deserialize<T>(payload: any): T {
    return JSON.parse(JSON.stringify(payload));
}

export function genId(length: number = 6) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from(Array(length), () => characters.charAt(Math.floor(Math.random() * characters.length))).join("");
}

export function thousandSeparator(x: string | number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
