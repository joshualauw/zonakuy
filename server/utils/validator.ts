import yup from "yup";

export async function schemaValidator<T>(schema: yup.AnySchema<T>, body: T) {
    try {
        const validated = await schema.validate(body, { abortEarly: false });
        return validated;
    } catch (err: any) {
        throw createError({
            statusCode: 400,
            data: err.inner.map((e: yup.ValidationError) => ({ path: e.path, message: e.message })),
        });
    }
}
