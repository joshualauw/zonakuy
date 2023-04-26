export function generateErrorChecks(errors: ValidationError[], properties: string[]): Record<string, string> {
    const result: Record<string, string> = {};
    properties.forEach((prop) => {
        const errorIndex = errors.map((e) => e.path).findIndex((p) => p == prop);
        Object.assign(result, { [prop]: errorIndex >= 0 ? errors[errorIndex].message : "" });
    });
    return result;
}

export function deserialize(payload: any) {
    return JSON.parse(JSON.stringify(payload));
}
