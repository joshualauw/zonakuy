import { ErrorType } from "./constants";
import yup from "yup";

export async function schemaValidator<T>(schema: yup.ObjectSchema<any>, body: T) {
    try {
        const validated = await schema.validate(body, { abortEarly: false });

        return validated;
    } catch (err: any) {
        if (err instanceof yup.ValidationError) {
            throw createError({
                statusCode: 400,
                message: ErrorType.validation,
                data: err.inner.map((e) => ({ path: e.path, message: e.message })),
            });
        }
    }
}
