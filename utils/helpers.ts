import dayjs from "dayjs";

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

export function genId(length: number = 6, numberOnly = false) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const numbers = "0123456789";
    if (numberOnly) {
        return Array.from(Array(length), () => numbers.charAt(Math.floor(Math.random() * numbers.length))).join("");
    } else {
        return Array.from(Array(length), () => characters.charAt(Math.floor(Math.random() * characters.length))).join(
            ""
        );
    }
}

export function thousandSeparator(x: string | number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function hourToDate(time: string) {
    return dayjs(new Date())
        .set("hour", parseInt(time.split(":")[0]))
        .set("minute", parseInt(time.split(":")[1]))
        .toDate();
}

export const makeRange = (start: number, end: number) => {
    const result: number[] = [];
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
};
