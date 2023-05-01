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
